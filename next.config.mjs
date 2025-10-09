/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental : {
        optimizePackageImports: [ "cakra-ui/react"],
    },
};

export default nextConfig;
