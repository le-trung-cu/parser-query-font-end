import { fireEvent, render, screen, within, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { wait } from "@testing-library/user-event/dist/utils";
import { setupServer } from 'msw/node';
import { handlers } from "../../mocks/handlers";
import { AddPlaceType } from "./AddPlaceType";

const server = setupServer(...handlers);

describe('AddPlaceType test', () => {

    beforeAll(() => server.listen())

    afterEach(() => server.restoreHandlers())

    afterAll(() => server.close())

    it('render a form', () => {
        render(<AddPlaceType />);
        const form = screen.getByTestId('add-place-type-form');
        expect(form).toBeInstanceOf(HTMLFormElement);
    })

    describe('place type', () => {
        it('can fetch suggestion place name', async () => {
            render(<AddPlaceType />);
            const autocomplete = screen.getByTestId('autocomplete-place-type');
            const input = within(autocomplete).getByRole('combobox');
            fireEvent.change(input, { target: { value: 'Xe cộ' } });
            await wait(1000);
            fireEvent.keyDown(autocomplete, { key: 'ArrowDown' });
            await wait();
            fireEvent.keyDown(autocomplete, { key: 'Enter' });
            await waitFor(() => expect(input).toHaveValue('Xe cộ'));
        })

        it("show error when submit with empty place type", async () => {
            render(<AddPlaceType />);
            expect(screen.queryByText('Type field is required')).toBeNull();
            const btn = screen.getByTestId('add-place-btn-sumbit');
            fireEvent.submit(btn);
            screen.getByText('Type field is required');
        })
    })

    describe('place name', () => {
        it("show error when submit with empty place name", async () => {
            render(<AddPlaceType />);
            expect(screen.queryByText('Type field is required')).toBeNull();
            const btn = screen.getByTestId('add-place-btn-sumbit');
            fireEvent.submit(btn);
            screen.getByText('Name field is required');
        })

        it('show error icon if place name was exist in the database', async () => {
            render(<AddPlaceType />);
            const autocomplete = screen.getByTestId('input-place-name');
            const input = within(autocomplete).getByRole('combobox');
            fireEvent.change(input, { target: { value: 'Xe cộ' } });
            // wait for loading icon remove
            await waitForElementToBeRemoved(await screen.findByTestId('loading-icon'), { timeout: 2000 });
            await screen.findByTestId('add-place-icon-error');
        })

        it("show validate icon if place name doesn't exist in the database", async () => {
            render(<AddPlaceType />);
            const autocomplete = screen.getByTestId('input-place-name');
            const input = within(autocomplete).getByRole('combobox');
            fireEvent.change(input, { target: { value: 'new place name' } });
            // wait for loading icon remove
            await waitForElementToBeRemoved(await screen.findByTestId('loading-icon'), { timeout: 2000 });
            await screen.findByTestId('add-place-icon-validate');
        })
    })

    describe('submit place name', () => {
        it("show error when submit with exist place name", async () => {
            render(<AddPlaceType />);
            // select place type
            const autocomplete = screen.getByTestId('autocomplete-place-type');
            const input = within(autocomplete).getByRole('combobox');
            fireEvent.change(input, { target: { value: 'Xe cộ' } });
            await wait(1000);
            fireEvent.keyDown(autocomplete, { key: 'ArrowDown' });
            await wait();
            fireEvent.keyDown(autocomplete, { key: 'Enter' });

            // input place name
            const placeNameCombobox = screen.getByTestId('input-place-name');
            const placeNameInput = within(placeNameCombobox).getByRole('combobox');
            fireEvent.change(placeNameInput, { target: { value: 'Xe cộ' } });
            const btn = screen.getByTestId('add-place-btn-sumbit');
            fireEvent.submit(btn);
            
            await screen.findByText('Place name has exist in the database');
        })

    })
})