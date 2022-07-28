import { Box, Stack, InputLabel, TextField, Button, Autocomplete } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { fetchPlaceTypesApi, fetchPlaceNameSuggestionsApi } from "../../api/api";
import { API_STATUS } from "../../api/api-status";

const useFetchPlaceTypes = () => {
    const [placeTypes, setPlaceTypes] = useState([]);
    const [fetchStatus, setFetchStatus] = useState(API_STATUS.IDLE);
    const statuses = useMemo(() => ({
        isIdle: fetchStatus === API_STATUS.IDLE,
        isPending: fetchStatus === API_STATUS.PENDING,
        isSuccess: fetchStatus === API_STATUS.SUCCESS,
        isError: fetchStatus === API_STATUS.ERROR,
    }), [fetchStatus])

    const initPlaceTypes = async () => {
        setFetchStatus(API_STATUS.PENDING);
        try {
            const placeTypes = await fetchPlaceTypesApi();
            setPlaceTypes(placeTypes);
            setFetchStatus(API_STATUS.SUCCESS);
        } catch (error) {
            setFetchStatus(API_STATUS.ERROR);
        }
    }

    return {
        placeTypes,
        fetchStatus,
        initPlaceTypes,
        ...statuses,
    }
}

const useFetchPlaceNameSuggestions = () => {
    const [placeNames, setPlaceNames] = useState([]);
    const [exist, setExist] = useState(false);
    const [fetchStatus, setFetchStatus] = useState(API_STATUS.IDLE);

    const statuses = useMemo(() => ({
        isIdle: fetchStatus === API_STATUS.IDLE,
        isPending: fetchStatus === API_STATUS.PENDING,
        isSuccess: fetchStatus === API_STATUS.SUCCESS,
        isError: fetchStatus === API_STATUS.ERROR,
    }), [fetchStatus])

    const fetchPlaceNames = async (name = '') => {
        setFetchStatus(API_STATUS.PENDING);
        if (name.length === 0) {
            setFetchStatus(API_STATUS.IDLE);
            setExist(false);
            setPlaceNames([]);
            return;
        }
        try {
            const { placeNames, exist } = await fetchPlaceNameSuggestionsApi(name);
            setPlaceNames(placeNames);
            setExist(exist);
            setFetchStatus(API_STATUS.SUCCESS)
        } catch (error) {
            setFetchStatus(API_STATUS.ERROR);
        }
    }

    return {
        exist,
        placeNames,
        fetchStatus,
        fetchPlaceNames,
        ...statuses,
    }
}

export const AddPlaceType = () => {
    const { placeTypes: placeTypeOptions, initPlaceTypes, isPending: isLoadingPlaceType } = useFetchPlaceTypes();
    const { exist, placeNames, fetchPlaceNames, isPending: isLoadingPlaceNameSuggestions } = useFetchPlaceNameSuggestions();

    const [selectedPlaceType, setSelectedPlaceType] = useState(null);

    const [placeName, setPlaceName] = useState('');


    useEffect(() => {
        initPlaceTypes();
    }, [])

    const fetchSuggestionTimeOutId = useRef(null);
    useEffect(() => {
        if (fetchSuggestionTimeOutId.current !== null) {
            clearTimeout(fetchSuggestionTimeOutId.current);
            fetchSuggestionTimeOutId.current = null;
        }
        fetchSuggestionTimeOutId.current = setTimeout(async () => {
            await fetchPlaceNames(placeName);
            fetchSuggestionTimeOutId.current = null;
        }, 300);
    }, [placeName])

    return (
        <Box data-testid="add-place-type-form" component="form" maxWidth={400} marginX="auto">
            <Stack direction="column" spacing={3}>
                <h1>Add place type</h1>
                <div>
                    <InputLabel id="place-type">Place type</InputLabel>
                    <Autocomplete
                        loading={isLoadingPlaceType}
                        data-testid="autocomplete-place-type"
                        id="place-type"
                        options={placeTypeOptions}
                        getOptionLabel={option => option.name}
                        onChange={(e, value) => setSelectedPlaceType(value)}
                        renderInput={(params) => (
                            <TextField {...params} variant="filled"
                                name="selectedPlaceType" />
                        )}
                    />
                </div>

                <div>
                    <InputLabel id="place-type-name">Place type name</InputLabel>
                    <Autocomplete
                        id="place-type-name"
                        freeSolo
                        loading={isLoadingPlaceNameSuggestions}
                        options={placeNames}
                        getOptionLabel={(option) => option.name}
                        filterOptions={(option) => option}
                        renderInput={(params) => (
                            <TextField {...params} variant="filled"
                                error={exist}
                                value={placeName}
                                onSelect={(e) => setPlaceName(e.target.value)}
                                onChange={(e) => setPlaceName(e.target.value)}
                                helperText={exist ? `${placeName} has existed in the database` : ' '} />
                        )}
                    />
                </div>

                <Button variant="outlined">Submit</Button>
            </Stack>
        </Box>
    );
}