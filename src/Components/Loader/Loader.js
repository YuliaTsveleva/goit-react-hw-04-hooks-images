import s from './Loader.module.css';
import { ImSpinner3 } from 'react-icons/im';

export default function PendingView() {
  return (
    <p className={s.Loading}>
      <ImSpinner3 size="100" className={s.IconSpinner} />
    </p>
  );
}
