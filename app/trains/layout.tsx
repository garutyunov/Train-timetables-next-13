import TypeTrainControl from '../../ui/TypeTrainControl';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <TypeTrainControl />
      {children}
    </div>
  );
}
