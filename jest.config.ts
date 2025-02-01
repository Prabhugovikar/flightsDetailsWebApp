module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest', 
    '^.+\\.(js|jsx)$': 'babel-jest'  
  },
  transformIgnorePatterns: [
    "/node_modules/(?!axios|react-router-dom)"
  ],
  moduleDirectories: ["node_modules", "src"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};