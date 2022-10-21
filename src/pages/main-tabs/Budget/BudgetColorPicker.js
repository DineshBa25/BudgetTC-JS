import React from 'react';
import {Stack} from "rsuite";

class BudgetColorPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: this.props.color
        };
    }



    render() {
        const availableColors = [ "#ff5722", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5","#03a9f4", "#009688", "#4caf50", "#ffeb3b", "#ff9800", "#ff5722", "#e91e63" ];

        //render stack that wraps with all the colors
        return (
            <Stack wrap direction={"row"} style={{width: 80}}>
                {availableColors.map((color, index) => {
                    return (

                            <div
                                key={index}
                                style={{
                                    backgroundColor: color,
                                    height: 20,
                                    width: 20,
                                    cursor: "pointer"
                                }}
                                onClick={() => {
                                    this.setState({ color })
                                    this.props.onChange(color)
                                }}
                            />
                    );
                })}
            </Stack>
        );

    }
}

export default BudgetColorPicker;