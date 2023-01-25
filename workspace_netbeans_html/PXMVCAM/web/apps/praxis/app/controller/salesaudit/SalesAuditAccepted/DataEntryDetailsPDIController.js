/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.controller.salesaudit.SalesAuditAccepted.DataEntryDetailsPDIController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryDetailsPDIController',
    BeanDelivery: {},
    urlWin01:  CONTEXTPATH + '/SalesAuditAccepted',
    init: function (view) {
        var me = this;
        //this.urlWin01 = Ext.String.trim(this.view.params.url01);
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        this.cargaDatos();
    },
    cargaDatos: function () {
        var me = this;
        var vl_A1672FPROC='';
        rec = me.view.params.rec;
        if(rec.data.A1672FPROC!==''){
            vl_A1672FPROC="20"+rec.data.A1672FPROC.substring(7, 5)+""+win.getMonthAbbreviation(rec.data.A1672FPROC.substring(2, 5))+""+ rec.data.A1672FPROC.substring(0, 2) ;
        }
        //console.log(win.getMonthAbbreviation(rec.data.A1672FPROC.substring(2, 5)));
        //09OCT20  win.getAbreviaturaMes()
        /*var mask = new Ext.LoadMask(Ext.getCmp(prototype.id0 + '-form'), {
         msg: 'Please Wait....'
         });
         mask.show();*/
        Ext.Ajax.request({
            url: me.urlWin01 + '/searchPDI',
            params: {
                VL_FPROC: vl_A1672FPROC,//rec.data.A1672FPROC,
                VL_TKT: rec.data.A1672CCUST+""+ rec.data.A1672FORMA + "" + rec.data.A1672SERIE +""+rec.data.A1672SEQ,
                VL_TRNCU:rec.data.A1672TRNCU
            },
            success: function (records, operation, success) {
                //mask.hide();
                var contenido='';
                var res = Ext.decode(records.responseText);
                //console.log(res.data);
                if (res.success) {
                    var resultByte = res.data;
                    var bytes = new Uint8Array(resultByte);
                    var blob = new Blob([bytes], {type: "application/png"});
                    var reader = new FileReader();//let reader = new FileReader();
                    
                    reader.onload = function() {
                        me.callbackText(reader.result);
                    }

                    reader.readAsText(blob, 'ISO-8859-1');
                    
                } else {
                    global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                        }});
                }
            }
        });
    },
    callbackText:function(resultHtml){
        document.getElementById("content-contenido_html").innerHTML=resultHtml;
        var text = $('.TextoSimple1').text();
        //console.log('dato',text);

        var template = new Ext.XTemplate(
                '<tpl for=".">',
                '<pre style="width: 100%; height: 100%; font-size: 11px !important;">',
                '<code data-language="shell">',
                '{code}',
                '</code>',
                '</pre>',
                '</tpl>',
                {
                    compiled: true
                }
        );
        template.append(prototype.id8 + '-contenido_html', {
            code: text
        });
        document.getElementById("content-contenido_html").innerHTML="";
    },
    onCancelClick: function (btn) {
        this.view.close();
    }
});



