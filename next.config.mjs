/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:[
            'uploadting.com',
            'utfs.io',
            'img.clerk.com',
            'subdomain',
            'files.stripe.com',
            'replicate.delivery'
        ],
        remotePatterns:[{hostname:"res.cloudinary.com"}, { protocol: "https", hostname: "oaipublic.azureedge.net", pathname: "/**" }]
    },
    reactStrictMode:false
};

export default nextConfig;
