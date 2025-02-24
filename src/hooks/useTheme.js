import { useSelector } from 'react-redux';

const useTheme = (getStyles) => {
    const theme = useSelector(state=> state.theme.theme);
    return {theme, styles: getStyles(theme)};
};

export default useTheme;
