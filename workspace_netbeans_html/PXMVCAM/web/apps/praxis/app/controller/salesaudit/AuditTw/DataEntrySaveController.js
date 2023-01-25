/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.salesaudit.AuditTw.DataEntrySaveController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntrySaveController',
    url: CONTEXTPATH + '/AuditTw',
    dataGuia: '',
    meDe: '',
    v_tabla: '',
    v_strSQL:'',
    p: {},
    params: {},
    /**
     * Constructor
     */
    init: function(view) {
        meDe = this;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function() {
        var params = this.view.params;
        
        Ext.getCmp(prototype.id + '-txtNameQuery').setValue(params.txtNameQuery);
        Ext.getCmp(prototype.id + '-txtNameQuery1').setValue(params.txtNameQuery1);
        Ext.getCmp(prototype.id + '-txtDescQuery').setValue(params.txtDescQuery);
        me.v_tabla = params.tabla;
        me.v_strSQL = params.strSQL;

//        var tabla = params.tabla;
//        var tabla2 = params.tabla2;
//
//        console.log(tabla);
//        console.log(tabla2);
//
//        Ext.Ajax.request({
//            url: meDe.url + '/obtainDataCampos',
//            method: 'POST',
//            timeout: 60000000,
//            params: {
//                tabla: tabla,
//                tabla2: tabla2
//            },
//            beforerequest: Ext.getCmp(prototype.id + '-dataEntryHelp').mask('Loading...'),
//            success: function(response, options) {
//                var res = Ext.JSON.decode(response.responseText);
//                console.log(res);
//                var lst = res.data;
//
//                if (lst.length > 0) {
//                    var storeData = Ext.create('Ext.data.Store', {
//                        data: lst,
//                        autoLoad: true
//                    });
//                    Ext.getCmp(prototype.id + '-gridHelp').bindStore(storeData);
//                }
//                Ext.getCmp(prototype.id + '-dataEntryHelp').unmask('Loading...');
//            }
//        });
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onEditClic: function(btn) {
        var data = this.view.params.data;

//        Ext.create('Ext.Praxis.view.cargo.ConciliationNewForm.DataEntryCaf020', {
//            id: prototype.id + '-dataEntryCaf020',
//            params: {
//                data: data
//            }
//        }).show();

    },
    getDataInputs: function(data) {



    },
    onSaveClick: function() {
        var txtNameQuery = Ext.getCmp(prototype.id + '-txtNameQuery').getValue();
//        var txtUsu_Send = Ext.getCmp(prototype.id + '-txtUsu_Send').getValue();
        var cbxQuerysAC = Ext.getCmp(prototype.id + '-cmbFav').getStore().data.items;

        if (txtNameQuery.trim() !== '') {
//            if (tipo === 'S') {
//                prototype.searchParams.IN_USU = txtUsu_Send.trim();
//                prototype.Guardar();
//            } else {
            meDe.params.IN_USU = '';
            var exist = false;
            for (var k = 0; k < cbxQuerysAC.length; k++) {
                if (cbxQuerysAC[k].data.CodQuery.trim() === txtNameQuery.trim()) {
                    exist = true;
                }
            }

            if (exist) {
                var ms = txtNameQuery + ' exists.You want to replace it?';
                global.Msg({msg: ms, icon: 3, buttons: 3, fn:
                            function(obj) {
                                if (obj === 'yes') {
                                    meDe.Guardar();
                                }
                            }
                });
            } else {
                this.Guardar();
            }
//            }
        } else {
            global.Msg({msg: 'The query needs a name'});
        }
    },
    Guardar: function() {
        var SaveSelect = '';
        var campo = '';
        var order = '@';
        var AscDesc = 0;
        var arr2 = Ext.getCmp(prototype.id + '-panelListColumns').getStore().data.items;
        var txtNameQuery = Ext.getCmp(prototype.id + '-txtNameQuery1').getValue()+Ext.getCmp(prototype.id + '-txtNameQuery').getValue();
        var txtDescQuery = Ext.getCmp(prototype.id + '-txtDescQuery').getValue();
//        var check = Ext.getCmp(prototype.id + '-chkSelGB').checked;
        var params = this.view.params;

        var tabla = params.tabla;
        var tabla2 = params.tabla2;

//        for (var h = 0;h < arr2.length; h++) {
//            var rowIndex = arr2[h].data["RN"];
//            console.log(rowIndex);
//            arr2[h].data["DownUp"] = $('#combo-' + rowIndex).val();
//            arr2[h].data["OrderBy"] = $('#input-' + rowIndex).val();
//        }

        for (var z = 0; z < arr2.length; z++) {
            if (arr2[z].data['select']) {

                if (arr2[z].data["OrderBy"].trim() !== '') {
                    order = arr2[z].data["OrderBy"];
                } else {
                    order = '@';
                }
                campo = arr2[z].data["campo"];
                AscDesc = arr2[z].data["DownUp"] === 'DESC' ? '1' : '0';
                if (z === 0) {
                    SaveSelect += campo + '#' + order + '#' + AscDesc + '#' + z;
                } else {
                    SaveSelect += ';' + campo + '#' + order + '#' + AscDesc + '#' + z;
                }
            }
        }



        meDe.params.strFecha = Ext.getCmp(prototype.id + '-cmbTipoFecha').getValue();
//        meDe.params.chkGroup = check;
        meDe.params.strSQL = meDe.v_strSQL;
        meDe.params.IN_TABLA = 'A1672';
        meDe.params.IN_TABLA2 = Ext.getCmp(prototype.id + '-cmbTabla2').getValue();
        meDe.params.strSaveSelect = SaveSelect;
        meDe.params.strSaveQuery = this.GuardarQuery();
        meDe.params.strCodigo = txtNameQuery.trim();
        meDe.params.strDescrip = txtDescQuery.trim();

        console.log('grabaaaa');
        console.log(meDe.params);
        Ext.Ajax.request({
            url: meDe.url + '/SaveQuery',
            params: {beanString:JSON.stringify(meDe.params)},
            method: 'POST',
            success: function(response, options) {
                var cmbFav = Ext.getCmp(prototype.id + '-cmbFav');
//                Ext.getCmp(prototype.id + '-txtNameQuery').setValue('');
//                Ext.getCmp(prototype.id + '-txtDescQuery').setValue('');
//                Ext.getCmp(prototype.id + '-txtUsu_Send').setValue('');

//                if (cmbFav.getValue() !== '') {
//                    Ext.getCmp(prototype.id + '-txtNameQuery').setValue(cmbFav.getValue());
//                    Ext.getCmp(prototype.id + '-txtDescQuery').setValue(prototype.getDatoCombo('-cmbFav', 'CodQuery', 'helper'));
//                }

                Ext.getCmp(prototype.id + '-dataEntrySaveQuery').close();
                meDe.obtainListFavoritos();
                global.Msg({
                    msg: 'Save Successful'
                });

            }
        });
    },
    obtainListFavoritos: function() {
//        var tabla = Ext.getCmp(prototype.id + '-cmbTabla').getValue();
        var tabla = me.v_tabla;
        var tabla = 'A1672';
        Ext.Ajax.request({
            url: meDe.url + '/obtainListFavoritos',
            params: {tabla: tabla},
            method: 'POST',
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                res = res.lstFavoritos;

                var listaFav = [];
                listaFav.push({CodQuery: "", label: "Select", helper: "",TabJoin:""});
                for (var i = 0; i < res.length; i++) {
                    var datos = {};
                    if(res[i].strCodigo.indexOf(Ext.getCmp(prototype.id + '-cmbFunction').getValue()) >= 0 ){
                        datos = {
                            CodQuery: res[i].strCodigo,
                            label: res[i].strCodigo + ' - ' + res[i].strDescrip,
                            helper: res[i].strDescrip,
                            TabJoin:res[i].IN_TABLA2
                        };
                        listaFav.push(datos);
                        
                    }
                }

                var storeData = Ext.create('Ext.data.Store', {
                    data: listaFav,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-cmbFav').bindStore(storeData);
                Ext.getCmp(prototype.id + '-cmbFav').setValue(listaFav[0].CodQuery);

            }
        });
    },
    onCloseClick: function() {
        Ext.getCmp(prototype.id + '-dataEntrySaveQuery').close();
    },
    GuardarQuery: function() {
        //Userfield = systfield
	var query= '';
	var campo01 = '';
	var campo02 = '';
	var campo03 = '';
	var campo04 = '';
	var campo05 = '';
	var campo06 = '';
	var campo07 = '';
        
        for (var i = 1; i < 8; i++) {
            
            var txtCampo = Ext.getCmp(prototype.id + '-txtCampo'+i);
            var cmbCampo = Ext.getCmp(prototype.id + '-cmbCampo'+i).getValue();
            var cmbOperador = Ext.getCmp(prototype.id + '-cmbOperador'+i).getValue();
            var txtValue = Ext.getCmp(prototype.id + '-txtValue'+i).getValue();
            
            if(txtCampo.isVisible()){
                    campo01 = this.getSystFieldByUserField(txtCampo.getValue().toUpperCase());
            }else if(cmbCampo!== ''){
                    campo01 = this.getSystFieldByUserField(cmbCampo.toUpperCase());
            }
            
            if(i===1){
                query += campo01 + ';' + cmbOperador + ';' + txtValue;
            }else{
                var cmbConector = Ext.getCmp(prototype.id + '-cmbConector'+i);
                var v = cmbConector.getValue();
                var record = cmbConector.findRecord(cmbConector.valueField || cmbConector.displayField, v);
                var index = cmbConector.store.indexOf(record);
                query += ';' + index + ';' + campo01 + ';' + cmbOperador + ';' + txtValue;
            }
            
        }
        //alert(query);
        return query;
    },
    getSystFieldByUserField: function(campo) {
        
	var objCampo;
	var campoA1248 = '';
        var lstCampos = Ext.getCmp(prototype.id + '-cmbCampo1').getStore().data.items;

        for (var j = 0; j < lstCampos.length; j++) {
            objCampo = lstCampos[j];
            if (objCampo.data["userfield"] === campo.trim()) {
                campoA1248 = objCampo.data["fieldSys"];
                break;
            }
        }
        return campoA1248;
    }
});


