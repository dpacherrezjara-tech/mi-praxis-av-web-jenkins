/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.sales.LoadControlBSP.FormatMasterFileController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-FormatMasterFileController',
   // url: CONTEXTPATH + '/LoadControlBSP',
    /**
     * Constructor
     */
    init: function(view) {
        var me = this;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function() {
        Ext.getCmp(prototype.id + '-de-txtA1698IDFIL').focus();
        //var p = this.view.params;
        //this.getDataInputs();
    },
    getDataInputs: function() {
        
    },
    getDataEntryValues: function() {
        var option = 'U';
        var VP_CCUST = '139';
        var VP_NROID =  Ext.getCmp(prototype.id + '-de-txtA1698IDFIL').getValue();
        return {
            option: option,
            VP_CCUST: VP_CCUST,
            VP_NROID: VP_NROID
        };
    },
    onSaveClick: function(btn) {
       //console.log(this.getDataEntryValues);
       var parm = this.getDataEntryValues();
       //console.log(parm);
       if ( Ext.String.trim( parm.VP_NROID ) === '' ){            
            //global.Msg({msg: 'Enter ID FILE'});
            alert('Enter ID FILE!');
            Ext.getCmp(prototype.id + '-de-txtA1698IDFIL').focus();
            return;
       }
       Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Process formatting master file?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    //this.view.params.action = "U";
                    this.crud();
                }
            }
        });

    },
    crud: function() {
        
        Ext.Ajax.request({
            url: prototype.url + '/processFormatBSPHOT',
            method: 'POST',
            timeout: 60000000,
            params: this.getDataEntryValues(),
            beforerequest: Ext.getCmp(prototype.id + '-FormatMasterFileForm').mask('Loading...', ''),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var objRtn = res.filter;
                //console.log(objRtn);
                Ext.getCmp(prototype.id + '-FormatMasterFileForm').unmask('Loading...', '');
                global.Msg({
                    msg: objRtn.dbException.MESSAGE,
                    icon: 1,
                    fn: function() {
                        //exito
                        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});                        
                        Ext.getCmp(prototype.id + '-FormatMasterFileForm').close();                        
                    }
                });
            }
        });
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onCancelClick: function(){
        Ext.getCmp(prototype.id + '-FormatMasterFileForm').close();
    }



});


