import { fireEvent, render, screen, within, waitFor } from "@testing-library/react";
import { wait } from "@testing-library/user-event/dist/utils";
import { setupServer } from 'msw/node';
import { handlers } from "../../mocks/handlers";
import { AddPlaceType } from "./AddPlaceType";

describe('AddPlaceType test', () => {
    const server = setupServer(
        ...handlers
    )
    beforeAll(() => {
        server.listen();
    })

    afterAll(() => {
        server.close();
    })


    it('render a form', () => {
        render(<AddPlaceType />);
        const form = screen.getByTestId('add-place-type-form');
        expect(form).toBeInstanceOf(HTMLFormElement);
    })

    it('can fetch suggestion place type name', async () => {

        render(<AddPlaceType />);

        const autocomplete = screen.getByTestId('autocomplete-place-type');
        const input = within(autocomplete).getByRole('combobox');
        fireEvent.change(input, { target: { value: 'Xe' } });
        await wait(1000);
        fireEvent.keyDown(autocomplete, { key: 'ArrowDown' });
        await wait();
        fireEvent.keyDown(autocomplete, { key: 'Enter' });
        await waitFor(() => expect(input).toHaveValue('Xe cộ'));
    })
})