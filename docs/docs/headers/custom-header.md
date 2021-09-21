---
sidebar_position: 5
---

# Custom Header

## Custom Header Props
|            Property            |                                 Type                                  | Required | Default  |                                                          Description                                                           |
| :----------------------------: | :-------------------------------------------------------------------: | :------: | :------: | :----------------------------------------------------------------------------------------------------------------------------: |
|          `background`          |                              `ReactNode`                              |    No    |    -     |                                               This renders background component                                                |
|       `backgroundColor`        |                               `string`                                |   Yes    |   `""`   |                                                    Header background color                                                     |
|       `backgroundImage`        |                         `ImageSourcePropType`                         |    No    |    -     |                                 This renders background image instead of background component                                  |
|           `bounces`            |                               `boolean`                               |    No    |  `true`  |                                                     Bounces on swiping up                                                      |
|           `children`           |                              `ReactNode`                              |    No    |    -     |                                       This renders all the children inside the component                                       |
|    `contentContainerStyles`    |                        `StyleProp<ViewStyle>`                         |    No    |    -     |                                                  Set scroll view body styles                                                   |
|       `decelerationRate`       |                         `"fast" or "normal"`                          |    No    | `"fast"` |       A floating-point number that determines how quickly the scroll view decelerates after the user lifts their finger.       |
|          `foreground`          |                              `ReactNode`                              |   Yes    |    -     |                                               This renders foreground component                                                |
|            `header`            |                              `ReactNode`                              |   Yes    |    -     |                                                 This renders header component                                                  |
|         `headerHeight`         |                               `number`                                |    No    |   `92`   |                                                  Sets height of folded header                                                  |
|          `headerSize`          |                     `(h: LayoutRectangle): void`                      |    No    |    -     |                                       Handler that is called when header's size changes                                        |
|         `initialPage`          |                               `number`                                |    No    |   `0`    |                                                  Set initial page of tab bar                                                   |
|  `keyboardShouldPersistTaps`   |                `boolean, "always", "never", "handled"`                |    No    |          |                                                Set keyboard persist taps method                                                |
|         `onChangeTab`          | `({ i, ref, from }: { from: number; i: number; ref: any; }) => void;` |    No    |    -     |                                                        Tab change event                                                        |
|         `onEndReached`         |                             `() => void`                              |    No    |    -     |                                                       Reached end event                                                        |
|         `onTopReached`         |                             `() => void`                              |    No    |    -     |                                                       Reached top event                                                        |
|    `onMomentumScrollBegin`     |      `(event: NativeSyntheticEvent<NativeScrollEvent>) => void`       |    No    |          |                 Called when the momentum scroll starts (scroll which occurs as the ScrollView starts gliding)                  |
|     `onMomentumScrollEnd`      |      `(event: NativeSyntheticEvent<NativeScrollEvent>) => void`       |    No    |          |                 Called when the momentum scroll ends (scroll which occurs as the ScrollView glides to a stop)                  |
|            `onRef`             |          `(t: null, StickyParallaxHeaderComponent) => void`           |    No    |          |                                          Obtain ref for StickyParallaxHeaderComponent                                          |
|        `parallaxHeight`        |                               `number`                                |    No    |          |                                                   Set parallax header height                                                   |
|        `refreshControl`        |                               `element`                               |    No    |          |                           A RefreshControl component, used to provide pull-to-refresh functionality                            |
|  `rememberTabScrollPosition`   |                                `bool`                                 |    No    | `false`  |                                  When switching between tabs remember current scroll position                                  |
|         `scrollEvent`          |      ` (event: NativeSyntheticEvent<NativeScrollEvent>) => void`      |    No    |          | Returns offset of header to apply custom animations. Fires at most once per frame during scrolling (Used in custom animations) |
|          `scrollRef`           |    `(t: ScrollView) => void` &#124; `MutableRefObject<ScrollView>`    |    No    |          |                                                    Get inner ScrollView ref                                                    |
|      `snapStartThreshold`      |                               `number`                                |    No    |    -     |                                               Set start value Threshold of snap                                                |
|      `snapStopThreshold`       |                               `number`                                |    No    |    -     |                                                Set stop value Threshold of snap                                                |
|          `snapToEdge`          |                               `boolean`                               |    No    |  `true`  |                                         Boolean to fire the function for snap To Edge                                          |
|          `snapValue`           |                               `number`                                |    No    |    -     |                                                Set value where header is closed                                                |
|      `tabTextActiveStyle`      |                              `TextStyle`                              |    No    |    {}    |                                                   Text styles of active tab                                                    |
| `tabTextContainerActiveStyle`  |                              `ViewStyle`                              |    No    |    {}    |                                                 Container styles of active tab                                                 |
|    `tabTextContainerStyle`     |                              `ViewStyle`                              |    No    |    {}    |                                                    Container styles of tab                                                     |
|         `tabTextStyle`         |                              `TextStyle`                              |    No    |    {}    |                                                       Text styles of tab                                                       |
|       `tabWrapperStyle`        |                              `ViewStyle`                              |    No    |    {}    |                                                      Tabs Wrapper styles                                                       |
|             `tabs`             |             `{ content: ReactElement; title: string; }[]`             |    No    |    -     |                                                       Array of tab names                                                       |
| `tabsContainerBackgroundColor` |                              `ViewStyle`                              |    No    |    -     |                                             Background color of tab bar container                                              |
|      `tabsContainerStyle`      |                              `ViewStyle`                              |    No    |    -     |                                               Set whole tab bar container style                                                |
|      `transparentHeader`       |                               `boolean`                               |    No    | `false`  |                                        Set header transparency to render custom header                                         |


<h1 id="Usage">Usage</h1>

Here is a basic example of how you can create a custom header

```jsx
import React from 'react'
import { Text, View, Animated, StyleSheet } from 'react-native'
import StickyParallaxHeader from 'react-native-sticky-parallax-header'

const styles = StyleSheet.create({
  content: {
    height: 1000,
    marginTop: 50
  },
  foreground: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  message: {
    color: 'white',
    fontSize: 40,
    paddingTop: 24,
    paddingBottom: 7
  },
  headerWrapper: {
    backgroundColor: 'green',
    width: '100%',
    paddingHorizontal: 24,
    paddingBottom: 25,
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 16,
    color: 'white',
    margin: 12
  },
  tabsWrapper: {
    paddingVertical: 12
  },
  tabTextContainerStyle: {
    backgroundColor: 'transparent',
    borderRadius: 18
  },
  tabTextContainerActiveStyle: {
    backgroundColor: 'lightgreen'
  },
  tabText: {
    fontSize: 16,
    lineHeight: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: 'white'
  }
})

class TabScreen extends React.Component {
  state = {
    scroll: new Animated.Value(0)
  }

  componentDidMount() {
    const { scroll } = this.state
    scroll.addListener(({ value }) => (this._value = value))
  }

  renderContent = (label) => (
    <View style={styles.content}>
      <Text>{label}</Text>
    </View>
  )

  renderForeground = () => {
    const { scroll } = this.state
    const titleOpacity = scroll.interpolate({
      inputRange: [0, 106, 154],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp'
    })

    return (
      <View style={styles.foreground}>
        <Animated.View style={{ opacity: titleOpacity }}>
          <Text style={styles.message}>STICKY HEADER</Text>
        </Animated.View>
      </View>
    )
  }

  renderHeader = () => {
    const { scroll } = this.state
    const opacity = scroll.interpolate({
      inputRange: [0, 160, 210],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp'
    })

    return (
      <View style={styles.headerWrapper}>
        <Animated.View style={{ opacity }}>
          <Text style={styles.headerTitle}>STICKY HEADER</Text>
        </Animated.View>
      </View>
    )
  }

  render() {
    const { scroll } = this.state

    return (
      <StickyParallaxHeader
        foreground={this.renderForeground()}
        header={this.renderHeader()}
        parallaxHeight={200}
        headerHeight={90}
        headerSize={() => {}}
        onEndReached={() => {}}
        scrollEvent={Animated.event([{ nativeEvent: { contentOffset: { y: scroll } } }])}
        tabs={[
          {
            title: 'First Tab',
            content: this.renderContent('FIRST TAB')
          },
          {
            title: 'Second Tab',
            content: this.renderContent('SECOND TAB')
          },
          {
            title: 'Third Tab',
            content: this.renderContent('THIRD TAB')
          },
          {
            title: 'Fourth Tab',
            content: this.renderContent('FOURTH TAB')
          },
          {
            title: 'Fifth Tab',
            content: this.renderContent('FIFTH TAB')
          }
        ]}
        tabTextStyle={styles.tabText}
        tabTextContainerStyle={styles.tabTextContainerStyle}
        tabTextContainerActiveStyle={styles.tabTextContainerActiveStyle}
        tabsContainerBackgroundColor={'green'}
        tabsWrapperStyle={styles.tabsWrapper}
      >
      </StickyParallaxHeader>
    )
  }
}
```
