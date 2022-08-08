import { Button, Box } from "@mui/material"
import { useEffect } from "react";
import { updatePlaceNameStatusApi } from "../../api/api";
import { LoadingIcon } from "../../components/LoadingIcon";
import { PENDING, SUCCESS, useApi } from "../../hooks/use-api";

export const StatusButton = ({ status = 0, variant = 1, placeId, updatedPlaceNameStatus, children }) => {
    const btnVariant = status === 0 || status !== variant ? 'outlined' : '';
    const { data, error, exce, status: statusApi } = useApi(updatePlaceNameStatusApi);

    const handleClick = async () => {
        if (btnVariant !== 'outlined') return;
        await exce(placeId, variant);

    }

    useEffect(() => {
        if (statusApi === SUCCESS && data !== null) {
            updatedPlaceNameStatus({ ...data, status: variant });
        }
    }, [statusApi, data])

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minWidth={100} minHeight={36}>
            <LoadingIcon loading={statusApi === PENDING} delay={500}>
                <Button variant={btnVariant} onClick={handleClick}>
                    {children}
                </Button>
            </LoadingIcon>
        </Box>
    )
}