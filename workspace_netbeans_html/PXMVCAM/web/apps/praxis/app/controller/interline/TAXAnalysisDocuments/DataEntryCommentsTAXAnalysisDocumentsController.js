Ext.define('Ext.Praxis.controller.interline.TAXAnalysisDocuments.DataEntryCommentsTAXAnalysisDocumentsController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryCommentsTAXAnalysisDocumentsController',
    meEntry: '',
    p: '',
    fechaClearing: '',
    bean: {},
    init: function(view) {
        meEntry = this;
        this.p = this.view.params;
        prototype.urlComments = CONTEXTPATH + '/Comments';
    },
    afterRender: function(){
    },
    onCancelClick: function(btn){
        this.view.close();
    },
    txtFilterValue_keyDownHandler: function ( obj , e , eOpts){
        if ( e.getKey() === e.ENTER ){
            var comm = '';
            switch (obj.id) {
                case prototype.id + '-txtCod1': comm = '1'; break;
                case prototype.id + '-txtCod2': comm = '2'; break;
                case prototype.id + '-txtCod3': comm = '3'; break;
            }
            this.buscarComentario(comm);
        }
    },
    buscarComentario: function (comm) {
        if (this.fechaClearing === '') {
            this.fechaClearing = this.getValue("txtClear").trim();
        }
        
        if (this.fechaClearing !== '') {
            this.codCom = comm;
            if (this.codCom === '1') {
                this.searchComm(this.getValue("txtCod1").trim(), this.fechaClearing);
            } else if (this.codCom === '2') {
                this.searchComm(this.getValue("txtCod2").trim(), this.fechaClearing);
            } else if (this.codCom === '3') {
                this.searchComm(this.getValue("txtCod3").trim(), this.fechaClearing);
            }
        } else {
            global.Msg({msg: 'Clearing Date not found. Please enter a Date.'});
            this.setValue('txtClear', '');
        }
    },
    viewComments: function () {
        Ext.create('Ext.Praxis.view.interline.TAXAnalysisDocumentsForm.DataEntryViewComm', {
            id: 'DataEntryViewCommTAXAnalysisDocumentsForm',
            params: {
                bean: {}
            }
        }).show();
    },
    btnSave_clickHandler: function () {
        if (this.p.listaSQL !== undefined && this.p.listaSQL.length > 0) {
            if (this.getValue("txtCod1") !== '' && this.getValue("txtComment1") !== '') {
                var listaComentarios = new Array();
                this.bean = {};
                this.bean.A021KEY = this.getValue("txtCod1").trim();
                this.bean.A021COMEN1 = this.getValue("txtComment1").trim();
                this.bean.A021COMEN2 = this.getValue("txtComment2").trim();
                listaComentarios.push(this.bean);
                
                if (this.getValue("txtCod2") !== '' && this.getValue("txtComment3") !== '') {
                    this.bean = {};
                    this.bean.A021KEY = this.getValue("txtCod2").trim();
                    this.bean.A021COMEN1 = this.getValue("txtComment3").trim();
                    this.bean.A021COMEN2 = this.getValue("txtComment4").trim();
                    listaComentarios.push(this.bean);
                }
                
                if (this.getValue("txtCod3") !== '' && this.getValue("txtComment5") !== '') {
                    this.bean = {};
                    this.bean.A021KEY = this.getValue("txtCod3").trim();
                    this.bean.A021COMEN1 = this.getValue("txtComment5").trim();
                    this.bean.A021COMEN2 = this.getValue("txtComment6").trim();
                    listaComentarios.push(this.bean);
                }
                
                this.saveComm(listaComentarios, this.p.listaSQL);
            } else {
                global.Msg({msg: 'You must enter a Comment (Code and Text).'});
            }
        } else {
            global.Msg({msg: 'An error has ocurred. Coupons not found for Update.'});
        }
    },
    //<editor-fold defaultstate="collapsed" desc="searchComm">
    searchComm: function (txtCod1, fechaClearing) {
        Ext.Ajax.request({
            url: prototype.urlComments + '/searchComm',
            method: 'POST',
            timeout: 60000000,
            params: {codigo: txtCod1, fechaClearing: fechaClearing},
            beforerequest: Ext.getCmp('DataEntryCommentsTAXAnalysisDocumentsForm').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp('DataEntryCommentsTAXAnalysisDocumentsForm').unmask();
                win.lblUser_toolTip("Estructura: Actualizada: A020 / Comentarios: A021");
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var comentario = res.comentario;
                    if (comentario !== undefined) {
                        if (meEntry.codCom === '1') {
                            meEntry.setValue('txtCod1', comentario.A021KEY);
                            meEntry.setValue('txtConcep1', comentario.A021CONCEP);
                            meEntry.setValue('txtComment1', comentario.A021COMEN1);
                            meEntry.setValue('txtComment2', comentario.A021COMEN2);
                        } else if (meEntry.codCom === '2') {
                            meEntry.setValue('txtCod2', comentario.A021KEY);
                            meEntry.setValue('txtConcep2', comentario.A021CONCEP);
                            meEntry.setValue('txtComment3', comentario.A021COMEN1);
                            meEntry.setValue('txtComment4', comentario.A021COMEN2);
                        } else if (meEntry.codCom === '3') {
                            meEntry.setValue('txtCod3', comentario.A021KEY);
                            meEntry.setValue('txtConcep3', comentario.A021CONCEP);
                            meEntry.setValue('txtComment5', comentario.A021COMEN1);
                            meEntry.setValue('txtComment6', comentario.A021COMEN2);
                        }
                    } else {
                        global.Msg({msg: 'Not Comment found.'});
                    }
                } else global.Msg({msg: res.sesion});
                global.clear();
            },
            failure: function (response, opts) {
                Ext.getCmp('DataEntryCommentsTAXAnalysisDocumentsForm').unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="saveComm">
    saveComm: function (listaComentarios, listaSQL) {
        Ext.Ajax.request({
            url: prototype.urlComments + '/saveComm',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(bean)},
            beforerequest: Ext.getCmp('DataEntryCommentsTAXAnalysisDocumentsForm').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp('DataEntryCommentsTAXAnalysisDocumentsForm').unmask();
                win.lblUser_toolTip("Estructura: Actualizada: A020 / Comentarios: A021");
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var msj = res.mensaje;
                    global.Msg({msg: msj});
                } else global.Msg({msg: res.sesion});
                global.clear();
            },
            failure: function (response, opts) {
                Ext.getCmp('DataEntryCommentsTAXAnalysisDocumentsForm').unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>

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
    }
});