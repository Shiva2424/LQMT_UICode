import {
    React,
    Paper,
    withStyles,
    generateStyles,
    useState,
    useEffect,
    Card,
    List,
    ListItem
  } from '../../Shared/Utils/CommonImports';
  import { leftPanelStyles as componentStyles } from './LeftPanelStyles';

  export type ILeftPanelProps = {
    classes?: any;
    listData: any;
    setSelectedListItem: (item: string) => void;
  }

  const LeftPanel: React.FC<ILeftPanelProps> = props => {
    const { listData, setSelectedListItem } = props;

    const selectedList = (item: string) => {
      setSelectedListItem(item)
    }

    return (
        <Paper>
          <List className={'leftPanel'}>
            {
              listData.map((el:any) => {
                return <ListItem onClick={(event: any) => selectedList(el.name)}>{el.value}</ListItem>
              })
            }
          </List>
           
        </Paper>
    )
  }

  export default LeftPanel;