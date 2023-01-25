/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.salesaudit.SalesMasterReportForm.SalesMasterDataEntryEmailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SalesMasterDataEntryEmailController',
    url: CONTEXTPATH + '/SalesMasterReportForm',
    bean: {},
    /**
     * Constructor
     */
    init: function (view) {
        var me = this;
        this.getDataInputs();
    },
    getDataInputs: function () {

        Ext.getCmp(prototype.idSalesMasterEmail + '-txtCorreoCopi').setValue('avelazquezp@aeromexico.com;jgil@aeromexico.com');

    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        //var p = this.view.params;



    },
    onSaveClick: function () {
        var me = this;
        var CorreoPri = Ext.getCmp(prototype.idSalesMasterEmail + '-txtCorreoPri').getValue();
        var CorreoCopi = Ext.getCmp(prototype.idSalesMasterEmail + '-txtCorreoCopi').getValue();
        //nn
        var cmbSearch = Ext.getCmp(prototype.id + '-search-type').getValue();
        var txtCia = Ext.getCmp(prototype.id + '-txtCia').getValue();
        var txtFrmaSerie = Ext.getCmp(prototype.id + '-txtFrmaSerie').getValue();
        var txtSeq = Ext.getCmp(prototype.id + '-txtSeq').getValue();
        var txtFilterDateFrom = Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue();
        var txtFilterDateTo = Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue();
        var txtCountry = Ext.getCmp(prototype.id + '-txtCountry').getValue();
        var ComboSource = Ext.getCmp(prototype.id + '-ComboSource').getValue();
        var ComboChannel = Ext.getCmp(prototype.id + '-ComboChannel').getValue();
        var txtIATA = Ext.getCmp(prototype.id + '-txtIATA').getValue();
        var ComboTransfer = Ext.getCmp(prototype.id + '-ComboTransfer').getValue();
        //var txtAmount = Ext.getCmp(prototype.id + '-txtAmount').getValue();
        var txtAgent = Ext.getCmp(prototype.id + '-txtAgent').getValue();
        var ComboRFND = Ext.getCmp(prototype.id + '-ComboRFND').getValue();
        var ComboTRNCO = Ext.getCmp(prototype.id + '-ComboTRNCO').getValue();
        var ComboStatusADM = Ext.getCmp(prototype.id + '-ComboStatusADM').getValue();

        var ComboTrncu = Ext.getCmp(prototype.id + '-ComboTrncu').getValue();
        //var ComboLikeFBasis = Ext.getCmp(prototype.id + '-ComboLikeFBasis').getValue();
        var txtFBasis = Ext.getCmp(prototype.id + '-txtFBasis').getValue();
        var ComboLikeReason = Ext.getCmp(prototype.id + '-ComboLikeReason').getValue();
        var txtCodReason = Ext.getCmp(prototype.id + '-txtCodReason').getValue();
        var ComboTypeDocume = Ext.getCmp(prototype.id + '-ComboTypeDocume').getValue();
        //var txtFilterBookDateFrom = Ext.getCmp(prototype.id + '-txtFilterBookDateFrom').getRawValue();
        var txtIT = Ext.getCmp(prototype.id + '-txtIT').getValue();
        var cmbOpcionAudit = Ext.getCmp(prototype.id + '-cmbOpcionAudit').getValue();
        var cmbTypeMemo = Ext.getCmp(prototype.id + '-cmbTypeMemo').getValue();

        if (Ext.getCmp(prototype.idSalesMasterEmail + '-txtCorreoPri').getValue().trim() === '') {
            global.Msg({
                msg: 'You must enter at least one email.'
            });
        }
        if (cmbSearch === '') {
            global.Msg({msg: 'Select Of By'});
            return;
        }
        if (cmbSearch === "1" || cmbSearch === "4") {
            if (txtCia === '') {
                Ext.MessageBox.alert('PRAXIS', "Enter Date CIA", function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.id + '-txtCia').focus();", 100);
                });
                return;
            }
            if (txtFrmaSerie === '') {
                Ext.MessageBox.alert('PRAXIS', "Enter Date Ticket", function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.id + '-txtFrmaSerie').focus();", 100);
                });
                return;
            }


        }
        if (cmbSearch === "2" || cmbSearch === "3") {
            if (txtFilterDateFrom !== '') {
                if (txtFilterDateTo === '') {
                    global.Msg({msg: 'Enter Date To'});
                    return;
                }
            }
            if (txtFilterDateTo !== '') {
                if (txtFilterDateFrom === '') {
                    global.Msg({msg: 'Enter Date From'});
                    return;
                }
            }
            if (txtFilterDateFrom !== '' && txtFilterDateTo !== '') {

                if (global.existeFecha(txtFilterDateFrom) !== '') {
                    Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtFilterDateFrom), function (btn, text) {
                        if (btn === 'ok' || btn === 'cancel')
                            setTimeout("Ext.getCmp(prototype.id + '-txtFilterDateFrom').focus();", 100);
                    });
                    return;
                }

                if (global.existeFecha(txtFilterDateTo) !== '') {
                    Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtFilterDateTo), function (btn, text) {
                        if (btn === 'ok' || btn === 'cancel')
                            setTimeout("Ext.getCmp(prototype.id + '-txtFilterDateTo').focus();", 100);
                    });
                    return;
                }
                if (Date.parse(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getValue()) > Date.parse(Ext.getCmp(prototype.id + '-txtFilterDateTo').getValue())) {
                    Ext.MessageBox.alert('PRAXIS', "the starting date must be less than the end date", function (btn, text) {
                        if (btn === 'ok' || btn === 'cancel')
                            setTimeout("Ext.getCmp(prototype.id + '-txtFilterDateTo').focus();", 100);
                    });
                    return;
                }
            }

        }
        if (txtCountry === 'ALL') {
            me.bean.VP_PAIS = '';
        } else {
            me.bean.VP_PAIS = txtCountry;
        }
        if (txtCodReason === 'ALL') {
            me.bean.VP_CODREASON = '';
        } else {
            me.bean.VP_CODREASON = txtCodReason;
        }
        if (txtFrmaSerie !== '') {
            me.bean.VP_FRMSRIE = txtFrmaSerie;
            me.bean.VP_SEQ = txtSeq;
        } else {
            me.bean.VP_FRMSRIE = "";
            me.bean.VP_SEQ = "";
        }
        me.bean.VP_FILTER = cmbSearch;
        me.bean.VP_CIA = txtCia;
        //
        me.bean.VP_SOURCE = ComboSource;
        me.bean.VP_DATEFROM = txtFilterDateFrom;
        me.bean.VP_DATETO = txtFilterDateTo;
        me.bean.VP_CANAL = ComboChannel;
        me.bean.VP_TRNCU = ComboTrncu;
        me.bean.VP_IATA = txtIATA;
        me.bean.VP_IT = txtIT;
        me.bean.VP_FBASIS = txtFBasis;
        me.bean.VP_TYMEMO = cmbTypeMemo;
        me.bean.VP_AUDIT = cmbOpcionAudit;
        me.bean.VP_STATUS = ComboTransfer;
        me.bean.VP_TDOC = ComboTypeDocume;
        //AGREGAR
        me.bean.Agent = txtAgent;
        me.bean.BOOKTO = ComboStatusADM;
        me.bean.VP_STREVISION = Ext.getCmp(prototype.id + '-ComboTransfer').getValue();
        me.bean.CorreoPri = CorreoPri;
        me.bean.CorreoCopi = CorreoCopi;

        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Send report to the mail?',
            buttons: Ext.MessageBox.YESNO,
            scope: me,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    Ext.Ajax.request({
                        url: this.url + '/sendReport',
                        method: 'POST',
                        timeout: 60000000,
                        params: me.bean,
                        beforerequest: Ext.getCmp(prototype.idSalesMasterEmail + '-DataEntry-principal').mask('Loading...', ''),
                        success: function (response, options) {
                            var res = Ext.JSON.decode(response.responseText);
                            console.log(res.data);
                            global.Msg({
                                msg: res.data,
                                icon: 1,
                                fn: function () {
                                    Ext.getCmp(prototype.idSalesMasterEmail + '-DataEntry-principal').close();
                                }
                            });
                        }
                    });

                }
            }
        });


    },

    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    }
});


