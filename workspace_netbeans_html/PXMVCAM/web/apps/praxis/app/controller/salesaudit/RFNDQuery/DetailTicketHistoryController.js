/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.controller.salesaudit.RFNDQuery.DetailTicketHistoryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DetailTicketHistoryController',
    BeanDelivery: {},
    urlWin01: '',
    init: function (view) {
        var me = this;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        this.cargaDatos();
    },
    cargaDatos: function () {
        var me = this;
        var  texto='';
        rec = me.view.params.rec;
        for (var i = 0; i < rec.length; i++) {
              /*texto += 'SystemDateTime '+ rec[i].A3655DATE +' SystemProvider '+ rec[i].A3655HDAT1 +' InputMessage '+ rec[i].A3655INPUT
              +' SupportingDocument '+ rec[i].A3655SUPPO +' OldReservation '+ rec[i].A3655OLDRE + rec[i].A3655SUPPO +' OldReservation '+ rec[i].A3655OLDRE
              +' DocumentPurgeTypeCode '+ rec[i].A3655PURGE +' CurrentDocumentStatus '+ rec[i].A3655STATU +' ServiceCouponHistory '+ rec[i].A3655CHIST + "</b><p>"  ;*/
            
            texto += rec[i].A3655DATE +' '+ rec[i].A3655HDAT1 +' '+ rec[i].A3655INPUT
              +' '+ rec[i].A3655SUPPO +' '+ rec[i].A3655OLDRE + rec[i].A3655SUPPO +' '+ rec[i].A3655OLDRE
              +' '+ rec[i].A3655PURGE +' '+ rec[i].A3655STATU +' '+ rec[i].A3655CHIST + "</b><p>"  ;
            
        }
        // console.log(texto);
        me.callbackText(texto);
    },
    callbackText:function(resultHtml){
        //document.getElementById("content-contenido_historica_html").innerHTML=resultHtml;
        //var text = $('.TextoSimple1').text();

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
        template.append(prototype.idDetailTicketHistory + '-contenido_historica_html', {
            code: resultHtml
        });
    },
    onCancelClick: function (btn) {
        this.view.close();
    }
});





