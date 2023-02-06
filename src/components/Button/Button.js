import cx from 'classnames';
import './Button.css';

function Button({ children, design, onClick }) {
  const className = cx('Button', {
    'Button--outline': design === 'outline',
  });

  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}

export default Button;
