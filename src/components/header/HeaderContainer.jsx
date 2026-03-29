import Logo from './Logo';
import NavLinks from './NavLinks';

const HeaderContainer = ({ language, setLanguage }) => {
  return (
    <div className="header-container sticky top-0 z-50 flex items-center justify-between bg-gray-800 p-4 text-white shadow-md ltr:flex-row rtl:flex-row-reverse">
      <Logo />
      <NavLinks language={language} setLanguage={setLanguage} />
    </div>
  );
};

export default HeaderContainer;
