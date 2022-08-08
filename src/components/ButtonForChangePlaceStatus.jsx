import { Button } from "@mui/material";
import { useApi, PENDING } from "../hooks/use-api"
import { LoadingIcon } from "./LoadingIcon";

export const ButtonForChangePlaceStatus = ({ placeId, status, children }) => {
    const { data, error, exce, status: statusApi } = useApi();

    return (
        <LoadingIcon loading={statusApi === PENDING}>
            <Button onClick={() => exce(placeId, status)}>
                {children}
            </Button>
        </LoadingIcon>
    )
}