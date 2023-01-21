import { useNavigation } from "@react-navigation/native";
import { Text, View, ScrollView } from "react-native";

import { DAY_SIZE, HabitDay } from "../components/HabitDay";
import { Header } from "../components/Header";

import { generateDateFromYearsBeginning } from "../utils/generate-date-from-years-beginning";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
const datesFromYearStart = generateDateFromYearsBeginning();

const minimumSummaryDatesSize = 14 * 7;
const amountOfDaysToFill = minimumSummaryDatesSize - datesFromYearStart.length;

export function Home() {
  const { navigate } = useNavigation();

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />
      <View className="flex-row mt-5 mb-2">
        {weekDays.map((weekDay, index) => (
          <Text
            key={`${weekDay}-${index}`}
            className="text-zinc-400 text-xl font-bold text-center mx-1"
            style={{ width: DAY_SIZE }}
          >
            {weekDay}
          </Text>
        ))}
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="flex-row flex-wrap">
          {datesFromYearStart.map((date) => (
            <HabitDay
              key={date.toISOString()}
              onPress={() => navigate("habit", { date: date.toISOString() })}
            />
          ))}
          {amountOfDaysToFill > 0 &&
            Array.from({ length: amountOfDaysToFill }).map((_, index) => {
              return (
                <View
                  key={index}
                  className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                  style={{ height: DAY_SIZE, width: DAY_SIZE }}
                />
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
}
