import React, { useReducer } from "react";
import CounterGame from "@/components/CounterGame";
import ThemeSelector from "@/components/ThemeSelector";
import { ThemeContext } from "@/context/theme";
import { countReducer, initialState } from "@/store/counter";
import CountProvider from "@/providers/count";
import TheThing from "@/components/TheThing";
import ScrollToMe from "@/components/ScrollToMe";
import SwApi from "@/components/SwApi";
import MapTest from "@/components/MapTest";
import TransformEffect from "@/components/TransformEffect";
import LiveAnnouncer from "@/components/Announcer";
import Input from "@/components/Input";
import Disclosure from "@/components/Disclosure";
import PostDate from "@/components/PostDate";
import IntlWithValues from "@/components/IntlWithValues";
import AccessibleName from "@/components/AccessibleName";
import NestedIntl from "@/components/nestedIntl";
import StylesTest from "@/components/StylesTest";
import FakeBtn from "@/components/FakeBtn";
import Video from "@/components/Video";
import AriaProps from "@/components/AriaProps";
import LinkName from "@/components/LinkName";
import Form from "@/components/Form";
import FieldArray from "@/components/FieldArray";
import AriaDescribedby from "@/components/AriaDescribedby";
import StackingOrder from "@/components/StackingOrder";

function App(): JSX.Element {
  return (
    <>
      <StackingOrder />
      <AriaDescribedby />
      <FieldArray />
      <Form />
      <LinkName />
      <AriaProps />
      <Video />
      <FakeBtn />
      <StylesTest />
      <StylesTest useAccessibleStyles />
      <ThemeSelector />
      <NestedIntl />
      <AccessibleName />
      <IntlWithValues />
      <PostDate date={new Date(1e6)} />
      <Input />
      <Disclosure />
      <LiveAnnouncer />
      <ThemeContext.Provider value={"green"}>
        <CountProvider>
          <CounterGame />
        </CountProvider>
      </ThemeContext.Provider>
      <TransformEffect />
      <TheThing />
      <SwApi />
      <MapTest />
      <div className="h-80"></div>
      <ScrollToMe />
    </>
  );
}

export default App;
