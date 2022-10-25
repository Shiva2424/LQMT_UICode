const commonStyles = (theme: any) => {
    return {
      margin: {
        margin: theme.spacing(1)
      },
      publishSnackBarCls: {
        '& .MuiSnackbarContent-message': {
          padding: '5px 0px',
          '& button': {
            border: '1px solid #fff',
            marginLeft: '15px'
          }
        }
      },
      snackBarCls: {
        '& .MuiSnackbarContent-root': {
          backgroundColor: '#EF4242'
        }
      },
      infoIcon: {
        marginRight: theme.spacing(1.5),
        fontSize: theme.spacing(2.5),
        verticalAlign: 'middle'
      },
      barIcon: {
        marginRight: theme.spacing(1.5),
        fontSize: theme.spacing(2.5),
        verticalAlign: 'top'
      },
      cursorPointer: {
        cursor: 'pointer'
      }
    };
  };
  
  const generateStyles = (theme: any, componentStyles: any) => ({ ...commonStyles(theme), ...componentStyles(theme) });
  export default generateStyles;  