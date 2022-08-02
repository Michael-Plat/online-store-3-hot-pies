import React from 'react';
import ContentLoader from 'react-content-loader';

const PieBlockLoader = () => (
  <ContentLoader
    className="pie-block"
    speed={2}
    width={280}
    height={400}
    viewBox="0 0 280 400"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <rect x="9" y="0" rx="10" ry="10" width="260" height="195" />
    <rect x="2" y="205" rx="0" ry="0" width="275" height="30" />
    <rect x="-1" y="250" rx="11" ry="11" width="280" height="90" />
    <rect x="-1" y="360" rx="0" ry="0" width="90" height="30" />
    <rect x="122" y="350" rx="20" ry="20" width="155" height="45" />
  </ContentLoader>
);

export default PieBlockLoader;
