/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.gerencial.BusinessTools.DataEntryHelpController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryHelpController',
    url: CONTEXTPATH + '/BusinessTools',
    dataGuia: '',
    meDe: '',
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

        var tabla = params.tabla;
        var tabla2 = params.tabla2;

        console.log(tabla);
        console.log(tabla2);

        Ext.Ajax.request({
            url: meDe.url + '/obtainDataCampos',
            method: 'POST',
            timeout: 60000000,
            params: {
                tabla: tabla,
                tabla2: tabla2
            },
            beforerequest: Ext.getCmp(prototype.id + '-dataEntryHelp').mask('Loading...'),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                var lst = res.data;

                if (lst.length > 0) {
                    var storeData = Ext.create('Ext.data.Store', {
                        data: lst,
                        autoLoad: true
                    });
                    Ext.getCmp(prototype.id + '-gridHelp').bindStore(storeData);
                }
                Ext.getCmp(prototype.id + '-dataEntryHelp').unmask('Loading...');
            }
        });



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
    onCloseClick: function() {
        Ext.getCmp(prototype.id + '-dataEntryHelp').close();
    }




});


