function CommonLayout({ children }) {
  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
      </div>
      {children}
    </div>
  );
}
export default CommonLayout;