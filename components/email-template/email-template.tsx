type Props = {
  name: string;
  email: string;
  text: string;
};

export default function EmailTemplate({ name, email, text }: Props) {
  return (
    <div>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
      <p>Text: {text}</p>
    </div>
  );
}
