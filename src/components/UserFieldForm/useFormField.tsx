import { User } from '../../api/user';

const TITLE_OPTIONS = ['Ms', 'Mr', 'Miss', 'Mrs'];

export const useFormField = (
    fieldname: keyof User,
    value: string,
    onChange: (value: string) => void,
) => {
    switch (fieldname) {
        case 'title':
            return (
                <select value={value} onChange={ev => onChange(ev.target.value)}>
                    {TITLE_OPTIONS.map(x => (
                        <option key={x}>{x}</option>
                    ))}
                </select>
            );
        case 'firstName':
        case 'lastName':
        case 'postCode':
            return (
                <input type="text" value={value} onChange={x => onChange(x.target.value)}></input>
            );
    }
};
