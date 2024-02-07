/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        
        remotePatterns:[
            {protocol:"https",
                hostname:"utfs.io",
            hostname:"img.clerk.com"},

        ]
    }
}

module.exports = nextConfig
