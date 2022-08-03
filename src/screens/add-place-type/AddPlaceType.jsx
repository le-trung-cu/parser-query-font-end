import { Box, Stack, InputLabel, TextField, Button, Autocomplete, Alert, CircularProgress } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { fetchPlaceTypesApi, fetchPlaceNameSuggestionsApi, createPlaceNameApi } from "../../api/api";
import { STATUS, useApi } from "../../hooks/use-api";

const useFetchPlaceTypes = () => {
    const { data, error: fetchPlaceTypesError, exce, status: fetchPlaceTypesStatus } = useApi(fetchPlaceTypesApi);
    const [placeTypes, setPlaceTypes] = useState([]);

    useEffect(() => {
        exce();
    }, [exce]);

    useEffect(() => {
        setPlaceTypes(data?.items ?? []);
    }, [data])

    return {
        placeTypes,
        fetchPlaceTypesStatus,
        fetchPlaceTypesError,
    }
}

const useFetchPlaceNameSuggestions = () => {
    const [placeName, setPlaceName] = useState('');
    const fetchSuggestionTimeOutId = useRef(null);
    const [isPlaceNameExist, setIsPlaceNameExist] = useState(false);

    const {
        data: suggestions,
        error: fetchPlaceNameSuggestionsError,
        exce,
        status: fetchPlaceNameSuggestionsStatus,
    } = useApi(fetchPlaceNameSuggestionsApi);

    useEffect(() => {
        if (placeName === null || placeName === undefined || placeName.length === 0)
            return;

        if (fetchSuggestionTimeOutId.current !== null) {
            clearTimeout(fetchSuggestionTimeOutId.current);
            fetchSuggestionTimeOutId.current = null;
        }
        fetchSuggestionTimeOutId.current = setTimeout(async () => {
            await exce(placeName);
            fetchSuggestionTimeOutId.current = null;
        }, 300);
    }, [exce, placeName]);

    useEffect(() => {
        const exist = suggestions?.items?.findIndex(({ name }) => name.toLowerCase() === placeName.trim().toLowerCase()) >= 0;
        setIsPlaceNameExist(exist);
    }, [placeName, suggestions]);

    return {
        placeName,
        setPlaceName,
        suggestions,
        fetchPlaceNameSuggestionsError,
        fetchPlaceNameSuggestionsStatus,
        isPlaceNameExist,
    }
}

export const AddPlaceType = () => {
    const { placeTypes: placeTypeOptions, fetchPlaceTypesStatus } = useFetchPlaceTypes();
    const {
        placeName,
        setPlaceName,
        suggestions,
        fetchPlaceNameSuggestionsStatus,
        isPlaceNameExist,
    } = useFetchPlaceNameSuggestions();

    const { error: createPlaceNameError, exce: createPlaceName, status: createPlaceNameStatus } = useApi(createPlaceNameApi);

    const [selectedPlaceType, setSelectedPlaceType] = useState(null);

    const [createdPlaceName, setCreatedPlaceName] = useState('');

    const [submitError, setSubmitError] = useState({
        placeType: null,
        placeName: null,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (fetchPlaceNameSuggestionsStatus === STATUS.PENDING) {
            return;
        }
        if (validate()) {
            await createPlaceName(selectedPlaceType.id, placeName);
        }
    }

    useEffect(() => {
        if(createPlaceNameStatus === STATUS.SUCCESS){
            console.log('create place name success');
            setCreatedPlaceName(placeName);
            setPlaceName('');
        }
    }, [createPlaceNameStatus, setPlaceName])
    

    const getHelperTextPlaceName = () => {
        if (isPlaceNameExist && placeName?.length > 0) {
            return `${placeName} has exist in the data base`;
        }
        if (submitError.placeName !== null) {
            return submitError.placeName;
        }
        return ' ';
    }

    function validate() {
        let _errors = {
            placeType: null,
            placeName: null,
        }
        let hasError = false;
        if (selectedPlaceType == null) {
            hasError = true;
            _errors.placeType = 'Type field is required';
        }
        if (placeName === undefined || placeName === null || placeName.length === 0) {
            hasError = true;
            _errors.placeName = 'Name field is required';
        }
        if (isPlaceNameExist) {
            hasError = true;
        }
        setSubmitError(_errors);
        return !hasError;
    }

    const _placeNameShowCircularProgress = fetchPlaceNameSuggestionsStatus === STATUS.PENDING;
    const _placeNameShowError = !_placeNameShowCircularProgress && isPlaceNameExist;
    const _placeNameShowValidate = !_placeNameShowCircularProgress && !_placeNameShowError && placeName && placeName.length > 0
    return (
        <Box data-testid="add-place-type-form" component="form" maxWidth={400} marginX="auto" noValidate
            onSubmit={handleSubmit}>
            <Stack direction="column" spacing={3}>
                <h1>Add place type</h1>
                <div>
                    <InputLabel id="place-type">Place type</InputLabel>
                    <Autocomplete
                        loading={fetchPlaceTypesStatus === STATUS.PENDING}
                        data-testid="autocomplete-place-type"
                        id="place-type"
                        options={placeTypeOptions ?? []}
                        getOptionLabel={option => option.typeName}
                        isOptionEqualToValue={(option, value) => value !== null && option.type === value.type}
                        onChange={(e, value) => setSelectedPlaceType(value)}
                        renderInput={(params) => (
                            <TextField {...params} variant="filled"
                                required
                                error={submitError.placeType !== null}
                                helperText={submitError.placeType ?? ' '}
                                name="selectedPlaceType" />
                        )}
                    />
                </div>

                <div>
                    <InputLabel htmlFor="place-type-name">Place type name</InputLabel>
                    <Autocomplete
                        id="place-type-name"
                        freeSolo
                        loading={fetchPlaceNameSuggestionsStatus === STATUS.PENDING}
                        options={suggestions?.items?.map(option => option.name) ?? []}
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
                                    error={submitError.placeName !== null || isPlaceNameExist}
                                    helperText={getHelperTextPlaceName()} />
                                {_placeNameShowCircularProgress && <CircularProgress size={24} />}
                                {_placeNameShowError && <svg width={24} height={24} color="red" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" fill="none"><path d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11ZM5.25 8.25C5.25 7.83579 5.58579 7.5 6 7.5C6.41421 7.5 6.75 7.83579 6.75 8.25C6.75 8.66421 6.41421 9 6 9C5.58579 9 5.25 8.66421 5.25 8.25ZM5.50806 3.41012C5.55039 3.17688 5.75454 3 6 3C6.24546 3 6.44961 3.17688 6.49194 3.41012L6.5 3.5V6L6.49194 6.08988C6.44961 6.32312 6.24546 6.5 6 6.5C5.75454 6.5 5.55039 6.32312 5.50806 6.08988L5.5 6V3.5L5.50806 3.41012Z" fill="currentColor"></path></svg>}
                                {_placeNameShowValidate && <svg width={24} height={24} color="green" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path></svg>}
                            </Stack>
                        )}
                    />
                </div>

                <Stack spacing={2}>
                    {(createPlaceNameStatus === STATUS.ERROR) && (
                        <Alert variant="filled" severity="error">
                            {createPlaceNameError?.message}
                        </Alert>
                    )}
                    {createPlaceNameStatus === STATUS.SUCCESS && createdPlaceName?.length > 0 && (
                        <Alert severity="success" color="info">
                            {createdPlaceName} just added into the database.
                        </Alert>)}
                    <Button variant="contained" type="submit"
                        disabled={fetchPlaceNameSuggestionsStatus === STATUS.PENDING}>
                        Submit {placeName}
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
}