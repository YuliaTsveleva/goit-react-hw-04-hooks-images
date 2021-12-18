import s from './ErrorView.module.css';

export default function ErrorView({ message }) {
  return <p className={s.ErrorView}>{message}</p>;
}
