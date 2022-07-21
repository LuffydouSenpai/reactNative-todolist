/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React,{Component} from 'react';
import {StyleSheet, View, ScrollView, FlatList } from 'react-native';
import { Modal, Portal, Provider, Text, Button, TextInput } from 'react-native-paper';

class TodoList extends Component{

    constructor(props){
        super(props);
    }

    state = {
        list: [],
        inputTxt: '',
        clg:'',
        visible: false,
    }
    title = 'Ma TodoList';
    showModal = () => this.setState({visible:true});
    hideModal = () => this.setState({visible:false});
    insertList(){
        if (this.state.list.length === 0){
            let listTmp = this.state.list;
            listTmp.push({key:this.state.inputTxt});
            this.setState({list:listTmp});
        } else {
            let autorised = true;
            let clgTmp = '';
            this.state.list.map((value)=>{
                if (this.state.inputTxt === value.key){
                    autorised = false;
                    this.showModal();
                }
            });
            if (autorised){
                let listTmp = this.state.list;
                listTmp.push({key:this.state.inputTxt});
                this.setState({list:listTmp});
                this.setState({ clg: ''});
            }
            // avec une ternaire
            //autorised ? this.setState({ clg: ''}) : this.setState({clg: 'Cet objet est déjà dans la liste'})
        }
        this.setState({inputTxt:''});
    }

    deleteItem(index){
        let listTmp = this.state.list;
        listTmp.splice(index, 1);
        this.setState({list:listTmp});
    }

    render(){
        return (
                    <View style={[this.styles.background]}>

                        <Text style={[this.styles.purpleColor,this.styles.titre]}>{this.title}</Text>
                        <TextInput style={[this.styles.textInput]} onChangeText={(text)=>{this.setState({inputTxt:text})}} value={this.state.inputTxt}></TextInput>
                        <Button style={[this.styles.btnEnvoie]} title="OK" onPress={()=>{this.state.inputTxt.length !== 0 && this.insertList()}}></Button>
                        <ScrollView>
                            <FlatList
                                data={this.state.list}
                                renderItem={({item, index}) => <Text>
                                {item.key}
                                <Button
                                    title="X"
                                    onPress={()=>{this.deleteItem(index)}}
                                ></Button>
                                </Text>}
                            />
                        </ScrollView>
                        <Text>{this.state.clg.key}</Text>
                        <Provider>
                            <Portal>
                                <Modal dismissable={true} visible={this.state.visible} onDismiss={this.hideModal} contentContainerStyle={this.styles.containerStyle}>
                                    <Text>Cet objet est déjà dans la liste</Text>
                                </Modal>
                            </Portal>
                        </Provider>
                    </View>
        );
    }

    styles = StyleSheet.create({
        purpleColor: {
            textAlign: 'center',
            color: 'purple',
        },
        titre: {
            fontSize: 40,
        },
        textInput: {
             borderColor: 'purple',
             borderStyle: 'solid',
             borderWidth: 1,
             width: '90%',
             marginLeft: 'auto',
             marginRight: 'auto',
             marginBottom: 10,
        },
        btnEnvoie: {
            width: '90%',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: 10,
        },
        background:{
            backgroundColor: 'gray',
        },
        containerStyle:{
            backgroundColor: 'white', padding: 20
        },
    });
}

export default TodoList;