let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  // Note: The exclamation mark in the folder name causes webpack issues
  // The most reliable solution is to rename the project folder to remove special characters
  // For now, we'll use a minimal webpack config that may not fully resolve all issues
  webpack: (config, { dev, isServer }) => {
    // Minimal path fixing - only for the most critical paths
    const fixPathString = (str) => {
      if (typeof str === 'string' && str.includes('!')) {
        return str.replace(/!/g, '%21')
      }
      return str
    }
    
    // Only fix the most essential paths to avoid breaking webpack plugins
    if (config.cache && config.cache.cacheDirectory) {
      config.cache.cacheDirectory = fixPathString(config.cache.cacheDirectory)
    }
    
    if (config.context) {
      config.context = fixPathString(config.context)
    }
    
    if (config.output && config.output.path) {
      config.output.path = fixPathString(config.output.path)
    }
    
    return config
  },
}

mergeConfig(nextConfig, userConfig)

function mergeConfig(nextConfig, userConfig) {
  if (!userConfig) {
    return
  }

  for (const key in userConfig) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...userConfig[key],
      }
    } else {
      nextConfig[key] = userConfig[key]
    }
  }
}

export default nextConfig
