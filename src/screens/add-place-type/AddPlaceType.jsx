import { Box, Stack, InputLabel, TextField, Button, Autocomplete } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { fetchPlaceTypesApi, fetchSuggestionsApi } from "../../api/api";

export const AddPlaceType = () => {
    const [placeTypeOptions, setPlaceTypeOptions] = useState([]);
    const [selectedPlaceType, setSelectedPlaceType] = useState(null);

    const [placeTypeName, setPlaceTypeName] = useState('');
    const [suggestedPlaceTypes, setSuggestedPlaceTypes] = useState([]);

    const fetchSuggestionTimeOutId = useRef(null);

    useEffect(() => {
        initPlaceType();
    }, [])

    useEffect(() => {
        if (fetchSuggestionTimeOutId.current !== null) {
            clearTimeout(fetchSuggestionTimeOutId.current);
            fetchSuggestionTimeOutId.current = null;
        }
        fetchSuggestionTimeOutId.current = setTimeout(async () => {
            const placeTypes = await fetchSuggestionsApi(placeTypeName);
            console.log(placeTypes);
            setSuggestedPlaceTypes(placeTypes);
            fetchSuggestionTimeOutId.current = null;
        }, 0);
    }, [placeTypeName])


    async function initPlaceType() {
        const placeTypes = await fetchPlaceTypesApi();
        setPlaceTypeOptions(placeTypes);
    }

    return (
        <Box data-testid="add-place-type-form" component="form" maxWidth={400} marginX="auto">
            <Stack direction="column" spacing={3}>
                <h1>Add place type</h1>
                {selectedPlaceType && (<div>
                    <h6>{selectedPlaceType.name}</h6>
                    <h6>{selectedPlaceType.id}</h6>
                </div>)}
                <div>
                    <InputLabel id="place-type">Place type</InputLabel>
                    <Autocomplete
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
                        options={suggestedPlaceTypes}
                        getOptionLabel={(option) => option.name}
                        filterOptions={(option) => option}
                        renderInput={(params) => (
                            <TextField {...params} variant="filled"
                                value={placeTypeName}
                                onChange={(e) => setPlaceTypeName(e.target.value)} />
                        )}
                    />
                </div>

                <Button variant="outlined">Submit</Button>
            </Stack>
        </Box>
    );
}