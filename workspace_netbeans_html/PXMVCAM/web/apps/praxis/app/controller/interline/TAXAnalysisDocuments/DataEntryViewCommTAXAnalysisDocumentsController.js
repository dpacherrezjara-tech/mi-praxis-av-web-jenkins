Ext.define('Ext.Praxis.controller.interline.TAXAnalysisDocuments.DataEntryViewCommTAXAnalysisDocumentsController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryViewCommTAXAnalysisDocumentsController',
    p: '',
    init: function(view) {
        this.p = this.view.params;
        prototype.urlViewComments = CONTEXTPATH + '/ViewComm';
        console.log(this.p);
    },
    afterRender: function(){
        this.setValue('txtCodigoViewComm', '');
        this.btnSearch_clickHandler();
    },
    btnSearch_clickHandler: function () {
        this.search(this.getValue("txtCodigoViewComm"));
    },
    search: function (txtCodigoViewComm) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.urlViewComments + '/search'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = {codigo: txtCodigoViewComm};
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A021");
                    
                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found'});
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDataViewComm').bindStore(storeGridDatas);
    },
    onCancelClick: function(btn){
        this.view.close();
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    setValue: function(id, txt) {
        return Ext.getCmp(prototype.id+'-'+id).setValue(txt);
    },
    getValue: function(id) {
        return Ext.getCmp(prototype.id+'-'+id).getValue();
    },
    focus: function(id) {
        return Ext.getCmp(prototype.id+'-'+id).focus();
    },
    onTextKeypress: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.btnSearch_clickHandler();
        }
    }
});