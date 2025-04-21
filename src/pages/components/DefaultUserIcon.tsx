import Avatar from '@mui/material/Avatar';

export default function DefaultUserIcon({name, furtherProp}: {name: string, furtherProp?: Object}) {

    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < name?.length; i += 1) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let userIconBgColor = '#';
  
    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        userIconBgColor += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return (
        <Avatar sx={{color: '#ffffff', bgcolor: userIconBgColor, ...furtherProp}}>
            {typeof name === 'string' ? name?.split(' ')[0][0] : ''}
        </Avatar>
    )
}