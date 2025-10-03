/* global axios */

Ext.define('Ext.Praxis.controller.payments.ExteriorBankReconciliation.ProcessDetailHeaderController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ProcessDetailHeaderController',
//    url: CONTEXTPATH + '/AccountingReport',
  //  request: axios.create({
  //      baseURL: CONTEXTPATH + '/AccountingReport',
   //     timeout: 0
   // }),
    notifier: new AWN(),
    
//<editor-fold defaultstate="collapsed" desc="onCancelClick">
    onCancelClick: function () {
        this.view.close();
    },
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="onAfterRenderSettlements">
onAfterRenderSettlements: async function () {
    const me = this;
    me.getView().setLoading(true);
    
    const totalTotal_S = me.getView().totalHeaderParam;
    const totalComision_S = me.getView().comisionHeaderParam;
    const totalAmount_S = me.getView().netoHeaderParam;
    this.lookupReference('lblTotalTotal_S').setValue('Total: ' + Ext.util.Format.number(totalTotal_S, '0,000.00'));
    this.lookupReference('lblTotalComision_S').setValue('Commission: ' + Ext.util.Format.number(totalComision_S, '0,000.00'));
    this.lookupReference('lblTotalAmount_S').setValue('Amount: ' + Ext.util.Format.number(totalAmount_S, '0,000.00'));
    
    const codpro = me.getView().codproParam || '';
    const stval = me.getView().stvalParam;
    const status = stval === 'L' ? 'M' : !stval ? 'P' : stval.trim() === '' ? 'P' : 'F';
//    M: MATCH
//    P: PENDING
//    F: FALLO / ERROR
     
        if (codpro.trim() === 'CM' && status.trim() === 'P') {
            me.lookupReference('btnInsert').setHidden(false);
            me.lookupReference('btnSave').setHidden(false);
            }
    const grid = this.lookupReference('settlementsGrid');
    const store = grid.getStore();

    try {
        const params = { 
            IN_TYPE: 'S',
            IN_LIQUIDACIO: this.getView().liquidaParam, 
            IN_DATE: this.getView().adateParam 
        };
        const storeData = await global.callStoreGet('PRAXISMP', 'MPS298', params);
         if (grid && storeData) {
            const rows = storeData.lstRs?.[0] || []; 
            if (rows.length > 0) {
                store.loadData(rows);
                store.commitChanges(); // limpia los dirty flags
            } else {
                store.removeAll(); // limpiar si hubiera algo
                grid.getView().setEmptyText("No settlements data available.");
                grid.getView().refresh();
            }
        }
    } catch (err) {
        Ext.Msg.alert("Error", "Failed to load settlements.");
    } finally {
        this.getView().setLoading(false);
    }
},
//</editor-fold> 

//<editor-fold defaultstate="collapsed" desc="onAfterRenderTaxes">
onAfterRenderTaxes: async function () {
    const me = this;
    me.getView().setLoading(true);
    
    const totalTotal_T = me.getView().totalHeaderParam;
    const totalComision_T = me.getView().comisionHeaderParam;
    const totalAmount_T = me.getView().netoHeaderParam;
    this.lookupReference('lblTotalTotal_T').setValue('Total: ' + Ext.util.Format.number(totalTotal_T, '0,000.00'));
    this.lookupReference('lblTotalComision_T').setValue('Commission: ' + Ext.util.Format.number(totalComision_T, '0,000.00'));
    this.lookupReference('lblTotalAmount_T').setValue('Amount: ' + Ext.util.Format.number(totalAmount_T, '0,000.00'));
    
    const codpro = me.getView().codproParam || '';
    const stval = me.getView().stvalParam;
    const status = stval === 'L' ? 'M' : !stval ? 'P' : stval.trim() === '' ? 'P' : 'F';
//    M: MATCH
//    P: PENDING
//    F: FALLO / ERROR
        if (codpro.trim() === 'CM' && status.trim() === 'P') {
            me.lookupReference('btnSaveTaxes').setHidden(false);
                }

    const grid = this.lookupReference('taxesGrid');
    const store = grid.getStore();
    
    try {
        const params = { 
            IN_TYPE: 'T',
            IN_LIQUIDACIO: this.getView().liquidaParam, 
            IN_DATE: this.getView().adateParam 
        };
        const storeData = await global.callStoreGet('PRAXISMP', 'MPS298', params);
        if (grid && storeData) {
            const rows = storeData.lstRs?.[0] || []; 
            if (rows.length > 0) {
                store.loadData(rows);
                store.commitChanges(); // limpia los dirty flags
            } else {
                store.removeAll(); // limpiar si hubiera algo
                grid.getView().setEmptyText("No taxes data available.");
                grid.getView().refresh();
            }
        }
    } catch (err) {
        Ext.Msg.alert("Error", "Failed to load taxes.");
    } finally {
        this.getView().setLoading(false);
    }
},
//</editor-fold>  

//<editor-fold defaultstate="collapsed" desc="onProcessInsert">
onProcessInsert: function () {
    const grid = this.lookupReference('settlementsGrid'); // antes estaba mal con 'transactionsGrid'
    const store = grid.getStore();
    
    let maxRN = 0;
        store.each(rec => {
            const rn = rec.get('RN');
            if (rn > maxRN) {
                maxRN = rn;
            }
        });
 
    // tomar la primera fila como base
   const firstRec = store.getAt(0);
    let baseData = {};
    
        // ahora sobreescribes solo lo necesario
        Ext.apply(baseData, {
            RN: maxRN + 1,
            STVAL: firstRec ? firstRec.get('STVAL') : '',
            TDOC: firstRec ? firstRec.get('TDOC') : '',
            LIQUIDACIO: firstRec ? firstRec.get('LIQUIDACIO') : '',
            CCUST: firstRec ? firstRec.get('CCUST') : '',
            SDATE: firstRec ? firstRec.get('SDATE') : '',
            ADATE: firstRec ? firstRec.get('ADATE') : '',
            SCOUNTRY: firstRec ? firstRec.get('SCOUNTRY') : '',
            CODEBANK: firstRec ? firstRec.get('CODEBANK') : '',
            SCARCOD: firstRec ? firstRec.get('SCARCOD') : '',
            SCARDN: '000000XXXXXX0000',
            SAUTHOC: firstRec ? firstRec.get('SAUTHOC') : '',
            SEQ: firstRec ? firstRec.get('SEQ') : '',
            SVFOP: firstRec ? firstRec.get('SVFOP') : '',
            SCURRENCY: firstRec ? firstRec.get('SCURRENCY') : '',
            NETO: 0,
            TOTAL: 0,
            COMISION: 0
        });


 
    const newRecord = store.add(baseData)[0];
    
       grid.getView().scrollRowIntoView(newRecord);
       grid.findPlugin('cellediting').startEdit(newRecord, grid.down('gridcolumn[dataIndex=TOTAL]'));
},
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="onProcessSave">
onProcessSave: async function () {
    const me = this;
    const liquidacio = me.getView().liquidaParam || '';
    const date = me.getView().adateParam || '';
    const grid = me.lookupReference('settlementsGrid');
    const store = grid.getStore();
    const tdocMap = {
        'SALE': 'S',
        'DEBIT': 'D',
        'REFUND': 'R',
        'VOID': 'V'
    };

    //  Solo tomar insertados (phantom) o modificados (dirty)
    const modified = store.getRange().filter(r => r.dirty || r.phantom);
    
    if (modified.length === 0) {
        Ext.Msg.alert("Info", "There are no changes to save.");
        return;
    }

     Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure you want to save the changes? This action is unrecoverable.',
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            scope: me,
            fn: async function (btnChoice) {
                if (btnChoice === 'yes') {
                   me.getView().setLoading(true);
                        try {
                             for (const rec of modified) {
                                 let total = rec.get('TOTAL') || 0;
                                 let rawTDOC = rec.get('TDOC') || '';
                                 let tdocValueOld = tdocMap[rawTDOC] || rawTDOC;
                                 const tdocValue = total >= 0 ? 'S' : 'D'; 
                                 
                                 let params = {
                                        IN_TYPE: rec.phantom ? 'I' : 'U',
                                        IN_LIQUIDACIO: (rec.get('LIQUIDACIO') || '').toString().trim(),
                                        IN_CCUST: (rec.get('CCUST') || '').toString().trim(),
                                        IN_SDATE: (rec.get('SDATE') || '').toString().trim(),
                                        IN_ADATE: (rec.get('ADATE') || '').toString().trim(),
                                        IN_SCOUNTRY: (rec.get('SCOUNTRY') || '').toString().trim(),
                                        IN_TDOC_OLD: tdocValueOld,
                                        IN_TDOC_NEW: tdocValue,
                                        IN_CODEBANK: (rec.get('CODEBANK') || '').toString().trim(),
                                        IN_SCARCOD: (rec.get('SCARCOD') || '').toString().trim(),
                                        IN_SCARDN: (rec.get('SCARDN') || '').toString().trim(),
                                        IN_SAUTHOC: (rec.get('SAUTHOC') || '').toString().trim(),
                                        IN_SEQ: (rec.get('SEQ') || '').toString().trim(),
                                        IN_SVFOP: (rec.get('SVFOP') || '').toString().trim(),
                                        IN_SCURRENCY: (rec.get('SCURRENCY') || 0).toString().trim(),
                                        IN_TOTAL: total,
                                        IN_COMISION: rec.get('COMISION') || 0,
                                        OUT_MSG: null
                                    };
                                  //  console.log("Call Stored PRAXISMP - MPS299: ", params)
                                 const response = await global.callStoreGet('PRAXISMP', 'MPS299', params);
                                 //console.log("response: ", response)
                               if (!response || Object.keys(response).length === 0) {
                                    throw new Error("No response from server");
                                }
                             }
                             
                             me.notifier.success("Changes saved successfully.");
                             store.commitChanges();
                             const parentGrid = Ext.ComponentQuery.query(prototype.id + '-HeaderDetailGrid')[0];
                             if (parentGrid) parentGrid.getStore().reload();
                             me.onCancelClick();
                             
                         } catch (err) {
                             console.error(err);
                             Ext.Msg.alert("Error", "Failed to save changes.");
                         } finally {
                                const view = me.getView?.() || me.view;
                                if (view) view.setLoading(false);
                         }                               
                }
            }
        });
},
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="onProcessSaveTaxes">
onProcessSaveTaxes: async function () {
    const me = this;
    const liquidacio = me.getView().liquidaParam || '';
    const date = me.getView().adateParam || '';
    const grid = me.lookupReference('taxesGrid');
    const store = grid.getStore();
    
    //  Solo tomar insertados (phantom) o modificados (dirty)
    const modified = store.getRange().filter(r => r.dirty || r.phantom);
    
    if (modified.length === 0) {
        Ext.Msg.alert("Info", "There are no changes to save.");
        return;
    }

     Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure you want to save the changes? This action is unrecoverable.',
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            scope: me,
            fn: async function (btnChoice) {
                if (btnChoice === 'yes') {
                   me.getView().setLoading(true);
                        try {
                             for (const rec of modified) {
                                 let params = {
                                        IN_TYPE: rec.phantom ? 'I' : 'U',  // I = insert, U = update
                                        IN_LIQUIDACIO: (rec.get('LIQUIDACIO') || '').toString().trim(),
                                        IN_CCUST: (rec.get('CCUST') || '').toString().trim(),
                                        IN_PRDA: (rec.get('PRDA') || '').toString().trim(),
                                        IN_CODPRO: (rec.get('CODPRO') || '').toString().trim(),
                                        IN_CCUSTPRO: (rec.get('CCUSTPRO') || '').toString().trim(),
                                        IN_FLIQUIDACI: (rec.get('FLIQUIDACI') || '').toString().trim(),
                                        IN_MERCHAND: (rec.get('MERCHAND') || '').toString().trim(),
                                        IN_MONEDA: (rec.get('MONEDA') || '').toString().trim(),
                                        IN_CODIGO: (rec.get('CODIGO') || '').toString().trim(),
                                        IN_CORRL: (rec.get('CORRL') || '').toString().trim(),
                                        IN_IMPORTE: rec.get('IMPORTE') || '',
                                        OUT_MSG: null
                                    };
                                 //   console.log("Call Stored PRAXISMP - MPS304: ", params)
                                 const response = await global.callStoreGet('PRAXISMP', 'MPS304', params);
                                 //console.log("response: ", response)
                              if (!response || Object.keys(response).length === 0) {
                                    throw new Error("No response from server");
                                }
                             }
                             
                             me.notifier.success("Changes saved successfully.");
                             store.commitChanges();
                             const parentGrid = Ext.ComponentQuery.query(prototype.id + '-HeaderDetailGrid')[0];
                             if (parentGrid) parentGrid.getStore().reload();
                             me.onCancelClick();
                             
                         } catch (err) {
                             console.error(err);
                             Ext.Msg.alert("Error", "Failed to save changes.");
                         } finally {
                                const view = me.getView?.() || me.view;
                                if (view) view.setLoading(false);
                         }                               
                }
            }
        });
},
//</editor-fold>


});


