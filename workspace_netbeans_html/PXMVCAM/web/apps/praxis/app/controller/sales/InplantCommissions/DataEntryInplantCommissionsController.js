Ext.define('Ext.Praxis.controller.sales.InplantCommissions.DataEntryInplantCommissionsController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryInplantCommissionsController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    searchParams: {},
    msjAlert: '',
    me: '',
    gloTitle: 'Inplant Commissions',
    // </editor-fold>
    init: function(view) {
        me = this;
    },
    afterRender: function(){
        this.p = this.view.params;
        var title = me.gloTitle+' - '+this.p.action;
        this.getView('DataEntryInplantCommissionsForm').setTitle(title);
        // <editor-fold defaultstate="collapsed" desc="hide">
        Ext.getCmp(prototype.id+'-btnLoad').hide();
        Ext.getCmp(prototype.id+'-btnDownload').hide();
        Ext.getCmp(prototype.id+'-btnDownloadcsv').hide();
        // </editor-fold>
        switch (this.p.action) {
            case 'LOAD':
                Ext.getCmp(prototype.id+'-txtIdLote2').setReadOnly(true);
                me.focus('txtIdLote2');
                
                Ext.getCmp(prototype.id+'-btnLoad').show();
                //Ext.getCmp(prototype.id+'-btnNew').show();
                Ext.getCmp(prototype.id + '-File').show();
                break;
            case 'DOWNLOAD':
                Ext.getCmp(prototype.id+'-txtIdLote2').setReadOnly(false);
                me.focus('txtIdLote2');
                
                Ext.getCmp(prototype.id+'-btnLoad').hide();
                //Ext.getCmp(prototype.id+'-btnNew').hide();
                Ext.getCmp(prototype.id + '-File').hide();
                
                Ext.getCmp(prototype.id+'-btnDownload').show();
                Ext.getCmp(prototype.id+'-btnDownloadcsv').show();
                break;
        }
    },
    
    onNewClick: function() {
        Ext.getCmp(prototype.id + '-File').setValue('');
        Ext.getCmp(prototype.id+'-txtIdLote2').setValue('');
    },
    // <editor-fold defaultstate="collapsed" desc="Botones">
    onLoadClick: function() {
        var me = this;
        var File = Ext.getCmp(prototype.id + '-File').getValue();
        
        if (File === '') {
            Ext.MessageBox.alert('PRAXIS', "Select File", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-File').focus();", 100);
            });
            return;
        }
        Ext.getCmp(prototype.id+'-txtIdLote2').setValue('');
        
        var form = Ext.getCmp(prototype.id + '-form-01').getForm();
        form.submit({
            url: prototype.url+'/upload_file2/',
            waitMsg: 'Uploading your sure to upload the file...',
            params: {},
            success: function (fp, o) {
                var res = Ext.decode(o.response.responseText);
                Ext.Msg.alert('Success', 'Your sure to upload the file "' + res.data + '" has been uploaded.');
                var vp_icon = 0;
                if (res.status === 'OK') {
                    vp_icon = 1;
                }
                global.Msg({msg: res.result, icon: vp_icon, fn: function () {
                    if (vp_icon === 1) {
                        Ext.getCmp(prototype.id+'-txtIdLote2').setValue(res.NLOTE);
                        Ext.getCmp(prototype.id + '-File').setValue();
                        Ext.getCmp(prototype.id+'-btnDownload').show();
                        Ext.getCmp(prototype.id+'-btnDownloadcsv').show();
                        //prototype.setGridData();
                    }
                }});
            }
        });
    },
    onDownloadClick: function() {
        //window.alert("onDownloadClick");
        var idLote = Ext.getCmp(prototype.id+'-txtIdLote2').getValue();
        if(idLote==''){
            global.Msg({
                msg: 'You must enter a batch ID'
            });
            Ext.getCmp(prototype.id+'-txtIdLote2').focus();
            return;
        }
        Ext.Msg.show({
            title: '.:PRAXIS:.-Confirm Download',
            msg: 'Please Confirm to proceed to download the file to your local machine',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    global.getFile(prototype.url + '/getXLSX/?IN_CIA=&IN_FORMA=&IN_SERIE=&IN_CUPON=&IN_NLOTE=' + idLote);
                }
            }
        });
    },
    onDownloadCSVClick: function() {
//        window.alert("onDownloadCSVClick");
        var idLote = Ext.getCmp(prototype.id+'-txtIdLote2').getValue();
        if(idLote==''){
            global.Msg({
                msg: 'You must enter a batch ID'
            });
            Ext.getCmp(prototype.id+'-txtIdLote2').focus();
            return;
        }
        Ext.Msg.show({
            title: '.:PRAXIS:.-Confirm Download',
            msg: 'Please Confirm to proceed to download the file to your local machine',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    global.getFile(prototype.url + '/getFileTxt/?IN_CIA=&IN_FORMA=&IN_SERIE=&IN_CUPON=&IN_NLOTE=' + idLote);
                }
            }
        });
    },
    onCancelClick: function(){
        this.view.close();
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function(id) {
        return Ext.getCmp(prototype.id+'-'+id).getValue();
    },
    focus: function(id) {
        Ext.getCmp(prototype.id+'-'+id).focus();
    },
    setValue: function(id, txt) {
        Ext.getCmp(prototype.id+'-'+id).setValue(txt);
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function( obj , e , eOpts){
        if ( e.getKey() === e.ENTER ){
            this.btnSearch_click();
        }
    }
    // </editor-fold>
});