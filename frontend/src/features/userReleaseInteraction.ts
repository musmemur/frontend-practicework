import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {fetchUserReleaseInteraction} from "../processes/fetchUserReleaseInteraction.ts";
import {deleteSavedReleaseByUser} from "../processes/deleteSavedReleaseByUser.ts";
import {saveReleaseByUser} from "../processes/saveReleaseByUser.ts";
import {deleteUserRating} from "../processes/deleteUserRating.ts";
import {saveUserRating} from "../processes/saveUserRating.ts";
import {deleteReview} from "../processes/deleteReview.ts";
import {saveReview} from "../processes/saveReview.ts";

interface UserReleaseInteraction {
    releaseId: string;
    isSaved: boolean;
    userRating: number | null;
    userReview: string;
}

interface UserReleaseInteractionState {
    interactions: Record<string, UserReleaseInteraction>;
    loading: boolean;
    error: string | null;
}

const initialState: UserReleaseInteractionState = {
    interactions: {},
    loading: false,
    error: null
};

export const userReleaseInteractionSlice = createSlice({
    name: 'userReleaseInteraction',
    initialState,
    reducers: {
        setInteraction: (state, action: PayloadAction<{releaseId: string; interaction: Partial<UserReleaseInteraction>}>) => {
            const { releaseId, interaction } = action.payload;
            if (!state.interactions[releaseId]) {
                state.interactions[releaseId] = {
                    releaseId,
                    isSaved: false,
                    userRating: null,
                    userReview: ''
                };
            }
            state.interactions[releaseId] = {
                ...state.interactions[releaseId],
                ...interaction
            };
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        }
    }
});

export const fetchUserInteraction =
    (userId: string, releaseId: string): any =>
        async (dispatch) => {
            try {
                dispatch(setLoading(true));
                const { isSaved, userRating, userReview } = await fetchUserReleaseInteraction(userId, releaseId);

                dispatch(setInteraction({
                    releaseId,
                    interaction: {
                        isSaved,
                        userRating,
                        userReview: userReview || ''
                    }
                }));
            } catch (error) {
                dispatch(setError(error instanceof Error ? error.message : 'Failed to fetch user interaction'));
            } finally {
                dispatch(setLoading(false));
            }
        };

export const toggleSaveRelease =
    (userId: string, releaseId: string, isCurrentlySaved: boolean): any =>
        async (dispatch) => {
            try {
                if (isCurrentlySaved) {
                    await deleteSavedReleaseByUser(userId, releaseId);
                } else {
                    await saveReleaseByUser(userId, releaseId);
                }

                dispatch(setInteraction({
                    releaseId,
                    interaction: {
                        isSaved: !isCurrentlySaved
                    }
                }));
            } catch (error) {
                dispatch(setError(error instanceof Error ? error.message : 'Failed to toggle save release'));
            }
        };

export const updateUserRating =
    (userId: string, releaseId: string, rating: number | null): any =>
        async (dispatch) => {
            try {
                if (rating === null) {
                    await deleteUserRating(userId, releaseId);
                } else {
                    await saveUserRating(userId, releaseId, rating);
                }

                dispatch(setInteraction({
                    releaseId,
                    interaction: {
                        userRating: rating
                    }
                }));
            } catch (error) {
                dispatch(setError(error instanceof Error ? error.message : 'Failed to update rating'));
            }
        };

export const updateUserReview =
    (userId: string, releaseId: string, review: string): any =>
        async (dispatch) => {
            try {
                if (review === '') {
                    await deleteReview(userId, releaseId);
                } else {
                    await saveReview(userId, releaseId, review);
                }

                dispatch(setInteraction({
                    releaseId,
                    interaction: {
                        userReview: review
                    }
                }));
            } catch (error) {
                dispatch(setError(error instanceof Error ? error.message : 'Failed to update review'));
            }
        };

export const { setInteraction, setLoading, setError } = userReleaseInteractionSlice.actions;

export default userReleaseInteractionSlice.reducer;