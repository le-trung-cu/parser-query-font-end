import { Box, Stack, InputLabel, TextField, Button, Autocomplete, Alert, CircularProgress } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { fetchPlaceTypesApi, fetchPlaceNameSuggestionsApi, createPlaceNameApi } from "../../api/api";
import { API_STATUS } from "../../api/api-status";

const useApiStatus = () => {

    const [fetchStatus, setFetchStatus] = useState(API_STATUS.IDLE);
    const [error, setError] = useState(null);

    const statuses = useMemo(() => ({
        isIdle: fetchStatus === API_STATUS.IDLE,
        isPending: fetchStatus === API_STATUS.PENDING,
        isSuccess: fetchStatus === API_STATUS.SUCCESS,
        isError: fetchStatus === API_STATUS.ERROR,
    }), [fetchStatus])

    return {
        fetchStatus,
        setFetchStatus,
        statuses,
        error,
        setError,
    }
}

const useFetchPlaceTypes = () => {
    const [placeTypes, setPlaceTypes] = useState([]);
    const { fetchStatus, setFetchStatus, statuses } = useApiStatus();

    const initPlaceTypes = useCallback(async () => {
        setFetchStatus(API_STATUS.PENDING);
        try {
            const placeTypes = await fetchPlaceTypesApi();
            setPlaceTypes(placeTypes);
            setFetchStatus(API_STATUS.SUCCESS);
        } catch (error) {
            setFetchStatus(API_STATUS.ERROR);
        }
    }, [setFetchStatus])

    useEffect(() => {
        initPlaceTypes()
    }, [initPlaceTypes])

    return {
        placeTypes,
        fetchStatus,
        ...statuses,
    }
}

const useFetchPlaceNameSuggestions = () => {
    const [placeNames, setPlaceNames] = useState([]);
    const [exist, setExist] = useState(false);
    const { fetchStatus, setFetchStatus, statuses } = useApiStatus();

    const fetchPlaceNames = useCallback(async (name = '') => {
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
    }, [setFetchStatus])

    return {
        exist,
        placeNames,
        fetchStatus,
        fetchPlaceNames,
        ...statuses,
    }
}

const useCreatePlaceName = () => {
    const { fetchStatus, setFetchStatus, statuses, setError, error } = useApiStatus();

    const createPlaceName = useCallback(async (placeType, name) => {
        setFetchStatus(API_STATUS.PENDING);
        setError(null);
        try {
            await createPlaceNameApi(placeType, name);
            setFetchStatus(API_STATUS.SUCCESS);
        } catch (error) {
            console.log(error.response.data);
            setFetchStatus(API_STATUS.ERROR);
            setError(error.response.data);
        }
    }, [setError, setFetchStatus])

    return {
        createPlaceName,
        error,
        fetchStatus,
        ...statuses,
    }
}

export const AddPlaceType = () => {
    const { placeTypes: placeTypeOptions, isPending: isLoadingPlaceType } = useFetchPlaceTypes();
    const { exist, placeNames, fetchPlaceNames, isPending: isLoadingPlaceNameSuggestions } = useFetchPlaceNameSuggestions();
    const {
        createPlaceName,
        isPending: isPendingCreatePlaceName,
        isSuccess: isCreatePlaceNameSuccess,
        isError: isCreaetePlaceNameError,
        fetchStatus,
        error } = useCreatePlaceName();

    const [selectedPlaceType, setSelectedPlaceType] = useState(null);
    const [placeName, setPlaceName] = useState('');

    const [createdPlaceName, setCreatedPlaceName] = useState(null);

    const [errors, setErrors] = useState({
        placeType: null,
        placeName: null,
    });
    
    useEffect(() => {
        if (fetchSuggestionTimeOutId.current !== null) {
            clearTimeout(fetchSuggestionTimeOutId.current);
            fetchSuggestionTimeOutId.current = null;
        }
        fetchSuggestionTimeOutId.current = setTimeout(async () => {
            await fetchPlaceNames(placeName);
            fetchSuggestionTimeOutId.current = null;
        }, 300);
    }, [fetchPlaceNames, placeName])

    const handleSubmit = async (e) => {
        setCreatedPlaceName('');
        e.preventDefault();
        // validate
        let _errors = {
            placeType: null,
            placeName: null,
        }
        let hasError = false;
        if (selectedPlaceType == null) {
            hasError = true;
            _errors.placeType = 'Type field is required';
        }
        if (exist) {
            hasError = true;
            _errors.placeName = errors.placeName;
        }
        if (placeName === undefined || placeName === null || placeName.length === 0) {
            hasError = true;
            _errors.placeName = 'Name field is required';
        }
        setErrors(_errors);
        // post data
        if (!hasError) {
            await createPlaceName(selectedPlaceType.id, placeName);
            if (isCreatePlaceNameSuccess) {
                console.log('create place name success');
                setCreatedPlaceName(placeName);
                setPlaceName('');
            }
        }
    }

    const fetchSuggestionTimeOutId = useRef(null);

    const getHelperTextPlaceName = () => {
        if (exist) {
            return `${placeName} has exist in the data base`;
        }
        if (errors.placeName !== null) {
            return errors.placeName;
        }
        return ' ';
    }

    return (
        <Box data-testid="add-place-type-form" component="form" maxWidth={400} marginX="auto" noValidate
            onSubmit={handleSubmit}>
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
                        isOptionEqualToValue={(option, value) => value !== null && option.id === value.id}
                        onChange={(e, value) => setSelectedPlaceType(value)}
                        renderInput={(params) => (
                            <TextField {...params} variant="filled"
                                required
                                error={errors.placeType !== null}
                                helperText={errors.placeType ?? ' '}
                                name="selectedPlaceType" />
                        )}
                    />
                </div>

                <div>
                    <InputLabel htmlFor="place-type-name">Place type name</InputLabel>
                    <Autocomplete
                        id="place-type-name"
                        freeSolo
                        loading={isLoadingPlaceNameSuggestions}
                        options={placeNames.map(option => option.name)}
                        value={placeName}
                        onChange={(e, newValue) => setPlaceName(newValue ?? '')}
                        inputValue={placeName}
                        onInputChange={(e, newInputValue) => setPlaceName(newInputValue ?? '')}
                        filterOptions={(option) => option}
                        clearOnBlur={false}
                        renderInput={(params) => (
                            <Stack direction="row" alignItems="baseline" spacing={1}>
                                <TextField {...params} variant="filled"
                                    required
                                    error={errors.placeName !== null || exist}
                                    helperText={getHelperTextPlaceName()} />
                                {isLoadingPlaceNameSuggestions && <CircularProgress size={24} />}
                                {!isLoadingPlaceNameSuggestions && (errors.placeName || exist) && <svg width={24} height={24} color="red" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" fill="none"><path d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11ZM5.25 8.25C5.25 7.83579 5.58579 7.5 6 7.5C6.41421 7.5 6.75 7.83579 6.75 8.25C6.75 8.66421 6.41421 9 6 9C5.58579 9 5.25 8.66421 5.25 8.25ZM5.50806 3.41012C5.55039 3.17688 5.75454 3 6 3C6.24546 3 6.44961 3.17688 6.49194 3.41012L6.5 3.5V6L6.49194 6.08988C6.44961 6.32312 6.24546 6.5 6 6.5C5.75454 6.5 5.55039 6.32312 5.50806 6.08988L5.5 6V3.5L5.50806 3.41012Z" fill="currentColor"></path></svg>}
                                {(!isLoadingPlaceNameSuggestions && !exist && errors.placeName === null && placeName && placeName.length > 0) && <svg width={24} height={24} color="green" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path></svg>}
                            </Stack>
                        )}
                    />
                </div>

                <Stack spacing={2}>
                    {(isCreaetePlaceNameError) && (
                        <Alert variant="filled" severity="error">
                            {error.errorMessage}
                        </Alert>
                    )}
                    {isCreatePlaceNameSuccess && createdPlaceName.length > 0 && (
                        <Alert severity="success" color="info">
                            {createdPlaceName} just added into the database.
                        </Alert>)}
                    <Button variant="contained" type="submit"
                        disabled={isLoadingPlaceNameSuggestions}>
                        Submit {placeName}
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
}