import { Box, Stack, InputLabel, TextField, Button, Autocomplete, Alert } from "@mui/material";
import { useEffect, useReducer, useRef } from "react";
import { fetchPlaceTypesApi, fetchPlaceNameSuggestionsApi, createPlaceNameApi } from "../../api/api";
import { LoadingIcon } from "../../components/LoadingIcon";
import { IDLE, ERROR, PENDING, SUCCESS } from "../../hooks/use-api";

const initState = {
    selectedPlaceType: null,
    inputPlaceName: '',
    inputPlaceNameExist: false,
    placeTypeList: {
        status: IDLE,
        items: [],
        totalCount: 0,
        error: null,
    },
    placeNameList: {
        status: IDLE,
        items: [],
        totalCount: 0,
        error: null,
    },
    submitPlaceName: {
        status: IDLE,
        createdPlaceName: null,
        error: null,
    },
    inputError: {
        placeType: null,
        placeName: null,
    }
}

function reducer(state = initState, action) {
    switch (action.type) {
        case 'SET_SELECTED_PLACE_TYPE':
            return {
                ...state,
                selectedPlaceType: action.payload
            }
        case 'SET_INPUT_PLACE_NAME':
            return {
                ...state,
                inputPlaceName: action.payload
            }
        case 'FETCH_PLACE_TYPE_LIST':
            switch (action.payload.status) {
                case IDLE:
                    return {
                        ...state,
                        placeTypeList: {
                            ...state.placeType,
                            status: IDLE,
                        }
                    }
                case SUCCESS:
                    return {
                        ...state,
                        placeTypeList: {
                            ...state.placeType,
                            status: SUCCESS,
                            items: action.payload.items,
                            totalCount: action.payload.totalCount,
                        }
                    }
                case ERROR:
                    return {
                        ...state,
                        placeTypeList: {
                            ...state.placeType,
                            status: ERROR,
                        }
                    }
                case PENDING:
                    return {
                        ...state,
                        placeTypeList: {
                            ...state.placeType,
                            status: PENDING,
                        }
                    }
                default:
                    break;
            }
            break;
        case 'FETCH_PLACE_NAME_LIST':
            switch (action.payload.status) {
                case IDLE:
                    return {
                        ...state,
                        placeNameList: {
                            ...state.placeNameList,
                            status: IDLE,
                        }
                    }
                case PENDING:
                    return {
                        ...state,
                        placeNameList: {
                            ...state.placeNameList,
                            status: PENDING,
                        }
                    }
                case SUCCESS:
                    // check input place name exist
                    const inputPlaceNameExist = action.payload.items.findIndex(item => item.name.toLowerCase() === state.inputPlaceName.toLowerCase()) >= 0;
                    return {
                        ...state,
                        inputPlaceNameExist,
                        placeNameList: {
                            ...state.placeNameList,
                            status: SUCCESS,
                            items: action.payload.items,
                            totalCount: action.payload.totalCount,
                        }
                    }
                case ERROR:
                    return {
                        ...state,
                        placeNameList: {
                            ...state.placeNameList,
                            status: ERROR,
                            error: action.payload.error,
                        }
                    }
                default:
                    break;
            }
            break;
        case 'SUBMIT_PLACE_NAME':
            switch (action.payload.status) {
                case PENDING:
                    return {
                        ...state,
                        submitPlaceName: {
                            ...state.submitPlaceName,
                            status: action.payload.status,
                            error: null,
                        }
                    }
                case SUCCESS:
                    return {
                        ...state,
                        inputPlaceName: '',
                        submitPlaceName: {
                            ...state.submitPlaceName,
                            status: action.payload.status,
                            createdPlaceName: action.payload.createdPlaceName,
                            error: null,
                        }
                    }
                case ERROR:
                    return {
                        ...state,
                        submitPlaceName: {
                            ...state.submitPlaceName,
                            status: action.payload.status,
                            createdPlaceName: null,
                            error: action.payload.error,
                        }
                    }
                default:
                    break;
            }
            break
        case 'SET_INPUT_ERROR':
            return {
                ...state,
                inputError: action.payload.error,
            }
        case 'RESET_INPUT_ERROR':
            return {
                ...state,
                inputError: {
                    placeType: '',
                    placeName: '',
                }
            }
        default:
            return state;
    }
}

function useAddPlaceTypeReducer() {
    const [state, dispatch] = useReducer(reducer, initState);

    return {
        state,
        dispatchResetInputError: () => dispatch({ type: 'RESET_INPUT_ERROR', payload: {} }),
        dispachSetInputError: (payload) => dispatch({ type: 'SET_INPUT_ERROR', payload }),
        dispatchSubmitPlaceName: (payload) => dispatch({ type: 'SUBMIT_PLACE_NAME', payload }),
        dispatchFetchPlaceTypeList: (payload) => dispatch({ type: 'FETCH_PLACE_TYPE_LIST', payload }),
        dispatchFetchPlacenameList: (payload) => dispatch({ type: 'FETCH_PLACE_NAME_LIST', payload }),
        dispatchInputPlaceName: (payload) => dispatch({ type: 'SET_INPUT_PLACE_NAME', payload }),
        dispatchSelectedPlaceType: (payload) => dispatch({ type: 'SET_SELECTED_PLACE_TYPE', payload }),
    }
}

export const AddPlaceType = () => {
    const {
        state,
        dispatchResetInputError,
        dispachSetInputError,
        dispatchSubmitPlaceName,
        dispatchFetchPlaceTypeList,
        dispatchFetchPlacenameList,
        dispatchInputPlaceName,
        dispatchSelectedPlaceType,
    } = useAddPlaceTypeReducer();

    let fetchPlaceTypeNamesTimeoutId = useRef(null);
    useEffect(() => {
        fetchPlaceTypes();
    }, [])

    return (
        <Box data-testid="add-place-type-form" id="add-place-type-form" component="form" maxWidth={400} paddingX={2} marginX="auto" noValidate
            onSubmit={handleSubmit}>
            <Stack direction="column" spacing={3}>
                <h1>Add place type</h1>
                <div>
                    <InputLabel id="place-type">Place type</InputLabel>
                    <Autocomplete
                        loading={state.placeNameList.status === PENDING}
                        data-testid="autocomplete-place-type"
                        id="place-type"
                        options={state.placeTypeList.items ?? []}
                        getOptionLabel={option => option.typeName}
                        isOptionEqualToValue={(option, value) => value !== null && option.type === value.type}
                        onChange={(e, value) => dispatchSelectedPlaceType(value.type)}
                        renderInput={(params) => (
                            <TextField {...params} variant="filled"
                                required
                                error={state.inputError.placeType?.length > 0}
                                helperText={state.inputError.placeType}
                                name="selectedPlaceType" />
                        )}
                    />
                </div>

                <div>
                    <InputLabel htmlFor="place-type-name">Place type name</InputLabel>
                    <Autocomplete
                        id="place-type-name"
                        data-testid="input-place-name"
                        freeSolo
                        loading={state.placeNameList.state === PENDING}
                        options={state.placeNameList.items?.map(option => option.name) ?? []}
                        value={state.inputPlaceName}
                        onChange={handleInputPlaceNameChange}
                        inputValue={state.inputPlaceName}
                        onInputChange={handleInputPlaceNameChange}
                        filterOptions={(option) => option}
                        clearOnBlur={false}

                        renderInput={(params) => (
                            <Stack direction="row" alignItems="baseline" spacing={1}>
                                <TextField error={state.inputPlaceNameExist || state.inputError.placeName?.length > 0} {...params} variant="filled"
                                    helperText={state.inputError.placeName}
                                    required />
                                <LoadingIcon loading={state.placeNameList.status === PENDING} delay={300}>
                                    {state.inputPlaceNameExist && <svg data-testid="add-place-icon-error" width={24} height={24} color="red" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" fill="none"><path d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11ZM5.25 8.25C5.25 7.83579 5.58579 7.5 6 7.5C6.41421 7.5 6.75 7.83579 6.75 8.25C6.75 8.66421 6.41421 9 6 9C5.58579 9 5.25 8.66421 5.25 8.25ZM5.50806 3.41012C5.55039 3.17688 5.75454 3 6 3C6.24546 3 6.44961 3.17688 6.49194 3.41012L6.5 3.5V6L6.49194 6.08988C6.44961 6.32312 6.24546 6.5 6 6.5C5.75454 6.5 5.55039 6.32312 5.50806 6.08988L5.5 6V3.5L5.50806 3.41012Z" fill="currentColor"></path></svg>}
                                    {!state.inputPlaceNameExist && state.inputPlaceName?.length > 0 && <svg data-testid="add-place-icon-validate" width={24} height={24} color="green" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path></svg>}
                                </LoadingIcon>
                            </Stack>
                        )}
                    />
                </div>

                <Stack spacing={2}>
                    {(state.submitPlaceName.status === ERROR) && (
                        <Alert variant="filled" severity="error">
                            {state.submitPlaceName.error?.message}
                        </Alert>
                    )}
                    {state.submitPlaceName.createdPlaceName && (
                        <Alert severity="success" color="info">
                            {state.submitPlaceName.createdPlaceName} just added into the database.
                        </Alert>)}
                    <Button data-testid="add-place-btn-sumbit" variant="contained" type="submit">
                        Submit {state.inputPlaceName}
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );

    function handleInputPlaceNameChange(event, newValue) {
        dispatchInputPlaceName(newValue ?? '');
        if (newValue && newValue.length > 0) {
            fetchPlaceTypeNameSuggestionss(newValue);
        }
    }

    function fetchPlaceTypeNameSuggestionss(name) {
        dispatchFetchPlacenameList({ status: PENDING });
        if (fetchPlaceTypeNamesTimeoutId.current !== null) {
            clearTimeout(fetchPlaceTypeNamesTimeoutId.current);
        }

        fetchPlaceTypeNamesTimeoutId.current = setTimeout(async () => {
            try {
                const { items = [], totalCount = 0 } = await fetchPlaceNameSuggestionsApi(name);
                dispatchFetchPlacenameList({ status: SUCCESS, items, totalCount });
            } catch (error) {
                dispatchFetchPlacenameList({ status: ERROR });
            }
            fetchPlaceTypeNamesTimeoutId.current = null;
        }, 300);
    }

    async function fetchPlaceTypes() {
        dispatchFetchPlaceTypeList({ status: PENDING });
        const { data: { items, totalCount }, error } = await fetchPlaceTypesApi();
        if (error) {
            dispatchFetchPlaceTypeList({ status: ERROR, error });
        } else {
            dispatchFetchPlaceTypeList({ status: SUCCESS, items, totalCount });
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        dispatchResetInputError()
        const error = validate();
        if (error) {
            dispachSetInputError({ error });
            return;
        }
        dispatchSubmitPlaceName({ status: PENDING });
        const { data, error: responseError } = await createPlaceNameApi(state.selectedPlaceType, state.inputPlaceName);

        if (responseError) {
            dispatchSubmitPlaceName({ status: ERROR, error: responseError })
        } else {
            dispatchSubmitPlaceName({ status: SUCCESS, createdPlaceName: data.name });
        }
    }

    function validate() {
        let error = null;

        if (state.selectedPlaceType === null) {
            error = { ...error, placeType: 'Type field is required' };
        }

        if (state.inputPlaceName.trim().length === 0) {
            error = { ...error, placeName: 'Name field is required' };
        }
        return error;
    }
}