import { useDispatch, useSelector } from "react-redux"
import { toggleTheme } from "../components/Store/ThemeSlice";
import "./ToggleButton.css"
import { useEffect } from "react";

const ToggleButton = () => {
    const mode = useSelector(s => s.Theme.theme)
    const dispatch = useDispatch();

    useEffect(() => {
      console.log(mode)

    }, [mode])
    

    return (
        <input
            type="checkbox"
            className="theme-checkbox"
            checked={mode === 'dark'}
            onChange={() => {dispatch(toggleTheme())}}
        />
    )
}

export default ToggleButton

// testting