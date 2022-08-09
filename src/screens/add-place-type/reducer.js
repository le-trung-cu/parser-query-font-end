import { IDLE, ERROR, PENDING, SUCCESS } from "../../hooks/use-api";

export const initState = {
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

export function reducer(state = initState, action) {
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