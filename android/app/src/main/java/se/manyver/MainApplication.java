/* Copyright (C) 2018-2019 The Manyverse Authors.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

package se.manyver;

import android.content.Context;

import com.janeasystems.rn_nodejs_mobile.RNNodeJsMobilePackage;
import com.aakashns.reactnativedialogs.ReactNativeDialogsPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.peel.react.rnos.RNOSModule;
import com.rnfs.RNFSPackage;
import com.bitgo.randombytes.RandomBytesPackage;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.soloader.SoLoader;
import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;
import com.solinor.bluetoothstatus.RNBluetoothManagerPackage;
import com.scuttlebutt.bluetoothbridge.BluetoothSocketBridgeConfiguration;
import com.scuttlebutt.bluetoothbridge.BluetoothSocketBridgePackage;
import com.staltz.reactnativeandroidlocalnotification.NotificationPackage;
import com.staltz.reactnativehasinternet.HasInternetPackage;
import com.devstepbcn.wifi.AndroidWifiPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import org.acra.*;
import org.acra.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@AcraCore(buildConfigClass = BuildConfig.class)
@AcraMailSender(mailTo = "incoming+staltz/manyverse@incoming.gitlab.com")
@AcraDialog(resText = R.string.acra_dialog_text, resCommentPrompt = R.string.acra_dialog_comment)
public class MainApplication extends NavigationApplication {

  @Override
  protected void attachBaseContext(Context base) {
    super.attachBaseContext(base);
    ACRA.init(this);
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }

  @Override
  protected ReactGateway createReactGateway() {
    ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
      @Override
      protected String getJSMainModuleName() {
        return "index.android";
      }
    };
    return new ReactGateway(this, isDebug(), host);
  }

  @Override
  public boolean isDebug() {
    // Make sure you are using BuildConfig from your own application
    return BuildConfig.DEBUG;
  }

  protected List<ReactPackage> getPackages() {

    String socketDir = this.getApplicationInfo().dataDir + "/files";

    UUID uuid = UUID.fromString("b0b2e90d-0cda-4bb0-8e4b-fb165cd17d48");

    BluetoothSocketBridgeConfiguration bluetoothConfig = new BluetoothSocketBridgeConfiguration(socketDir,
        "manyverse_bt_incoming.sock", "manyverse_bt_outgoing.sock", "manyverse_bt_control.sock", "scuttlebutt", uuid);

    // Add additional packages you require here
    // No need to add RnnPackage and MainReactPackage
    return Arrays.<ReactPackage>asList(new MainReactPackage(), new RNBluetoothManagerPackage(),
        new BluetoothSocketBridgePackage(bluetoothConfig), new PickerPackage(), new HasInternetPackage(),
        new AndroidWifiPackage(), new RNFSPackage(), new RandomBytesPackage(), new RNNodeJsMobilePackage(),
        new ReactNativeDialogsPackage(), new VectorIconsPackage(), new RNOSModule(), new NotificationPackage());
  }

  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    return getPackages();
  }

}
