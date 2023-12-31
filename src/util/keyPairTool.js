const crypto = require('crypto');

// Generate an RSA key pair
const generateKeyPair = () => {
	const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
		modulusLength: 2048, // Adjust the key size as needed
		publicKeyEncoding: {
			type: 'spki',
			format: 'pem',
		},
		privateKeyEncoding: {
			type: 'pkcs8',
			format: 'pem',
		},
	});
	//console.log('Public Key:', publicKey);
	//console.log('Private Key:', privateKey);
	return { publicKey, privateKey }
}

const genApiKey = () => {
	//create a base-36 string that is always 30 chars long a-z0-9
	// 'an0qrr5i9u0q4km27hv2hue3ywx3uu'
	return [...Array(30)]
		.map((e) => ((Math.random() * 36) | 0).toString(36))
		.join('');
};

const checkMatch = (publicKey, privateKey) => {
	const sign = crypto.createSign('SHA256');

	// Both strings should be same 
	sign.update('randomStr');
	sign.end();

	const signature = sign.sign(privateKey);

	const verify = crypto.createVerify('SHA256');

	// Both strings should be same 
	verify.update('randomStr');
	verify.end();
	return verify.verify(publicKey, signature);
}
module.exports = { generateKeyPair, genApiKey, checkMatch }