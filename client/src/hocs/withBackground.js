import React from 'react';

const style = {
  display: 'flex',
  backgroundColor: '#6E3ADB',
  backgroundImage: 'linear-gradient(#6E3ADB, #501CBD)',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100vh',
};
const withBackground = (props) => <div style={style}>{props.children}</div>;
export default withBackground;
