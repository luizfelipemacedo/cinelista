export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="dark:bg-gray-900 text-white px-4 md:px-6 py-6 flex items-center justify-between border-t">
      <p className="text-gray-600">{`© ${currentYear} Cinelista. Todos os direitos reservados ao TMDb.`}</p>
    </footer>
  );
}
