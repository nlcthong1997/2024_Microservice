import NodeRSA from 'node-rsa';

export const generateKeyPair = (bitLength = 512) => {
    // Tạo cặp khóa RSA
    const keys = new NodeRSA({ b: bitLength }); // Độ dài khóa 512-bit, có thể điều chỉnh theo nhu cầu

    const publicKey = keys.exportKey('pkcs8-public-pem');
    console.log('publicKey', publicKey);

    const privateKey = keys.exportKey('pkcs8-private-pem');
    console.log('privateKey', privateKey);

    return {
        publicKey,
        privateKey
    }
}

// generateKeyPair()