import s from './PendingView.module.css';
import { ImSpinner3 } from 'react-icons/im';

export default function PendingView() {
  return (
    <p className={s.Loading}>
      <ImSpinner3 size="32" className={s.IconSpinner} />
      Loading...
    </p>
  );
}
