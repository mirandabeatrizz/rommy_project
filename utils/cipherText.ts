"use strict"

import crypto, { BinaryLike, CipherGCMTypes, CipherKey } from "crypto";

/**
     * Gera o hash a partir de uma string
     * @param {*} data -> Texto para gerar o hash
     * @returns Devolve o texto em forma de hash
     */
export const hashMe = (data: string) => {
    return crypto.createHash('sha256').update(data.toString()).digest('hex');
}

/**
 * Criptografa e Descriptografa o texto informado
 */

class Criptografia {

    /**
     * Construtor da classe
     * @param {*} key -> Chave de criptografia
     * @param {*} iv  -> Vetor de inicialização
     * @param {*} algorithm -> Algoritmo de criptografia
     */

    key: Buffer;
    algorithm: CipherGCMTypes;
    iv: BinaryLike;

    constructor(key: Buffer, iv: Buffer, algorithm?: CipherGCMTypes) {

        // Verifique se o IV e a chave estão no formato e comprimento corretos
        if (key.length !== 32) {
            throw new Error('A chave deve ter exatamente 32 bytes');
        }

        if (iv.length !== 16) {
            throw new Error('O IV deve ter exatamente 16 bytes');
        }

        this.key = key;
        this.iv = iv;
        this.algorithm = algorithm ?? 'aes-256-gcm'
    }

    /**
     * Método para cripitografar o texto informado
     * @param {*} data -> Texto a ser criptografado
     * @returns Devolve o texto criptografado
     */
    criptografa(data: string) {
        const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);

        return cipher.update(data.toString(), 'utf8', 'hex') + cipher.final('hex');

    }

    /**
     * Método para descriptografar o texto informado
     * @param {*} data -> Texto a ser descriptografado
     * @returns Devolve o texto descriptografado
     */
    descriptografa(data: string) {

        try {
            const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);

            return decipher.update(data.toString(), 'hex', 'utf8') + decipher.final('utf8');

        } catch (error) {

            const newError = new Error(`Method: descriptografa \n ; file: server_utils/cipherText.ts:: ${error} `);

            console.error(newError.message, { critical: false, track: newError.stack });

            return error;
        }
    }
}

export default Criptografia;