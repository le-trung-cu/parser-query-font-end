import { CircularProgress } from "@mui/material"
import { useEffect, useRef, useState } from "react"

export const LoadingIcon = ({ loading, size = 24, delay = 300, children }) => {
    const [showLoading, setShowLoading] = useState(loading);
    const timeoutId = useRef(null);

    useEffect(() => {
        if (loading) {
            setShowLoading(true);
        } else {
            timeoutId.current = setTimeout(() => {
                setShowLoading(loading);
            }, delay)
        }
        return () => {
            clearTimeout(timeoutId.current);
        }
    }, [loading])

    return (
        <>
            {showLoading && <div style={{ justifyContent: 'center', display:'flex', flex: "1 1 0", alignItems: 'center' }}>
                <CircularProgress data-testid="loading-icon" size={size} />
            </div>}
            {!showLoading && children}
        </>
    )
}